import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from '@dtos';
import { AlreadyExistsException, NotFoundException } from '@exceptions';
import { RESOURCE } from '@enums';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.findFirst({
      where: { credentials: { email: createUserDto.email } },
    });

    if (user) {
      throw new AlreadyExistsException(RESOURCE.USER, {
        email: createUserDto.email,
      });
    }

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

  async updateUserById({ id, ...updateUserDto }: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUserById(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id },
      select: { credentials: true },
    });

    if (!user) {
      throw new NotFoundException(RESOURCE.USER, { id });
    }

    await this.prismaService.user.delete({
      where: { id },
      include: { credentials: true },
    });

    return true;
  }
}
