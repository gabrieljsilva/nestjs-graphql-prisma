import { PrismaClient } from '@prisma/client';
import { hashString } from '../../../../packages/user/domain';

export async function seedUsers(prisma: PrismaClient) {
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