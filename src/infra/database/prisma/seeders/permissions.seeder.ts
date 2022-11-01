import { PrismaClient } from '@prisma/client';
import { PERMISSIONS } from '../../../../enums';

export async function permissionsSeeder(prisma: PrismaClient) {
  await prisma.permission.createMany({
    data: Object.values(PERMISSIONS).map((permission) => ({
      name: permission,
    })),
    skipDuplicates: true,
  });
}
