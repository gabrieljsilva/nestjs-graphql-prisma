import { PrismaClient } from '@prisma/client';
import { PERMISSIONS, ROLES } from '../../../../enums';

export async function rolesSeeder(prisma: PrismaClient) {
  const rolesPermissions: Record<ROLES, PERMISSIONS[]> = {
    [ROLES.SUPER_ADMIN]: [PERMISSIONS.CAN_GET_USERS],

    [ROLES.USER]: [
      PERMISSIONS.CAN_DELETE_USER,
      PERMISSIONS.CAN_GET_USER,
      PERMISSIONS.CAN_UPDATE_USER,
      PERMISSIONS.CAN_CREATE_USER,
    ],
  };

  for (const [role, permissions] of Object.entries(rolesPermissions)) {
    for (const permission of permissions) {
      await prisma.role.upsert({
        where: {
          name: role,
        },
        create: {
          name: role,
          permissions: {
            connect: permissions.map((permission) => ({ name: permission })),
          },
        },
        update: {
          permissions: {
            connect: permissions.map((permission) => ({ name: permission })),
          },
        },
      });
    }
  }
}
