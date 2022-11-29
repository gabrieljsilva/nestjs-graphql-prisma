import { PrismaClient } from '@prisma/client';
import { hashString } from '../../../../packages/user/domain/hashing';
import { ROLES } from '../../../../enums';

export async function usersSeeder(prisma: PrismaClient) {
  const users = [
    {
      name: 'admin',
      email: 'admin@email.com',
      password: '12345678',
    },
  ];

  for (const user of users) {
    const userAlreadyExists = await prisma.credentials.findUnique({
      where: { email: user.email },
    });

    if (userAlreadyExists) {
      continue;
    }

    await prisma.user.create({
      data: {
        name: user.name,
        credentials: {
          connectOrCreate: {
            create: {
              email: user.email,
              password: hashString(user.password),
              status: 'ACTIVE',
              roles: {
                connect: {
                  name: ROLES.SUPER_ADMIN,
                },
              },
            },
            where: {
              email: user.email,
            },
          },
        },
      },
    });
  }
}
