import { PrismaClient } from '@prisma/client';
import { usersSeeder } from './users.seeder';
import { rolesSeeder } from './roles.seeder';
import { permissionsSeeder } from './permissions.seeder';

const prisma = new PrismaClient();

async function main() {
  await permissionsSeeder(prisma);
  await rolesSeeder(prisma);
  await usersSeeder(prisma);
}

main().then(async () => {
  await prisma.$disconnect();
});
