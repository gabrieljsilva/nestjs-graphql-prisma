import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserDto } from '@dtos';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        credentials: {
          create: {
            email: createUserDto.email,
            password: createUserDto.password,
          },
        },
      },
      include: {
        credentials: true,
      },
    });
  }

  async getUserById(id: string) {
    return this.prismaService.user.findFirst({
      where: { id },
    });
  }

  async findCredentialsByUserId(id: string) {
    return this.prismaService.credentials.findFirst({
      where: { user_id: id },
    });
  }
}
