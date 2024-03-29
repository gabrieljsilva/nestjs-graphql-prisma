import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/module/prisma.service';
import { CreateUserDto, UpdateUserDto } from '@dtos';
import { AlreadyExistsException, NotFoundException } from '@exceptions';
import { CREDENTIALS_STATUS, RESOURCE, TOKEN_TYPE } from '@enums';

import { hashString } from '../../domain';
import { PaginationInput } from '../../../../utils/graphql';
import { calculatePaginationMetadata } from '../../../../utils/function';
import { UserPaginated } from '../../../../domain/paginations';
import { MailerService } from '../../../../infra/mailer';
import { TokenService } from '../token';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly tokenService: TokenService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const alreadyRegisteredUser = await this.prisma.user.findFirst({
      where: { credentials: { email: createUserDto.email } },
    });

    if (alreadyRegisteredUser) {
      throw new AlreadyExistsException(RESOURCE.USER, {
        email: createUserDto.email,
      });
    }

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        credentials: {
          create: {
            status: CREDENTIALS_STATUS.WAITING_CONFIRMATION,
            email: createUserDto.email,
            password: hashString(createUserDto.password),
          },
        },
      },
    });

    const token = await this.tokenService.createToken(
      TOKEN_TYPE.ACCOUNT_CONFIRMATION,
      createUserDto.email,
    );

    this.mailerService.sendEmail({
      subject: 'Confirme sua conta',
      targetsEmails: [createUserDto.email],
      templateIdOrKey: 'confirm-account',
      variables: {
        userName: user.name,
        token: token,
      },
    });

    return user;
  }

  async getUserById(id: string) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async getManyUsers(
    { skip, take }: PaginationInput,
    filters?: Prisma.UserWhereInput,
  ): Promise<UserPaginated> {
    const totalItemsCount = await this.prisma.user.count({
      where: {
        credentials: {
          status: CREDENTIALS_STATUS.ACTIVE,
        },
      },
    });

    const users = await this.prisma.user.findMany({
      take: take,
      skip: skip,
      where: {
        credentials: {
          status: CREDENTIALS_STATUS.ACTIVE,
          user: filters,
        },
      },
    });

    const paginationMetadata = calculatePaginationMetadata({
      skip,
      take,
      totalItemsCount,
    });

    return {
      items: users,
      meta: paginationMetadata,
    };
  }

  async getCredentialsByUserId(id: string) {
    return this.prisma.credentials.findFirst({
      where: { user_id: id },
    });
  }

  async updateUserById({ id, ...updateUserDto }: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(RESOURCE.USER, { id });
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUserById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: { credentials: true },
    });

    if (!user) {
      throw new NotFoundException(RESOURCE.USER, { id });
    }

    await this.prisma.user.delete({
      where: { id },
      include: { credentials: true },
    });

    return true;
  }
}
