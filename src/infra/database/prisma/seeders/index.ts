import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seed-users';

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
}

main().then(async () => {
  await prisma.$disconnect();
});
