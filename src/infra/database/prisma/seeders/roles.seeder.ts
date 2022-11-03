import { PrismaClient } from '@prisma/client';
import { PERMISSIONS, ROLES } from '../../../../enums';

export async function rolesSeeder(prisma: PrismaClient) {
  const rolesPermissions: Record<ROLES, PERMISSIONS[]> = {
    [ROLES.SUPER_ADMIN]: [
      PERMISSIONS.CAN_GET_USERS,
      PERMISSIONS.CAN_UPLOAD_FILE,
    ],

    [ROLES.USER]: [
      PERMISSIONS.CAN_DELETE_USER,
      PERMISSIONS.CAN_GET_USER,
      PERMISSIONS.CAN_UPDATE_USER,
      PERMISSIONS.CAN_CREATE_USER,
    ],
  };

  for (const [roleName, permissions] of Object.entries(rolesPermissions)) {
    const role = await prisma.role.findFirst({
      where: { name: roleName },
      include: {
        permissions: true,
      },
    });

    if (!role) {
      return await prisma.role.create({
        data: {
          name: roleName,
          permissions: {
            connect: permissions.map((permission) => ({ name: permission })),
          },
        },
      });
    }

    await prisma.role.update({
      where: {
        name: roleName,
      },
      data: {
        permissions: {
          connect: permissions.map((permission) => ({ name: permission })),
        },
      },
    });
  }
}
