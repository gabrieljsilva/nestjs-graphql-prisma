import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module/prisma.service';
import { CreateUserDto, UpdateUserDto } from '@dtos';
import { AlreadyExistsException, NotFoundException } from '@exceptions';
import { CredentialsStatus, RESOURCE, TokenType } from '@enums';
import { hashString } from '../../domain';
import { PaginationInput } from '../../../../utils/graphql';
import { calculatePaginationMetadata } from '../../../../utils/function';
import { UserPaginated } from '../../../../domain/paginations';
import { UserFilters } from '../../../../domain/filterables';
import { PrismaFilterAdapter } from '../../../../utils/adapters';
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
            status: CredentialsStatus.WAITING_CONFIRMATION,
            email: createUserDto.email,
            password: hashString(createUserDto.password),
          },
        },
      },
    });

    const token = await this.tokenService.createToken(
      TokenType.ACCOUNT_CONFIRMATION,
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
    filters?: UserFilters,
  ): Promise<UserPaginated> {
    const totalItemsCount = await this.prisma.user.count({
      where: {
        credentials: {
          status: CredentialsStatus.ACTIVE,
        },
      },
    });

    const prismaQueryFilter = new PrismaFilterAdapter();
    const findUsersFilters = filters && prismaQueryFilter.getQuery(filters);

    const users = await this.prisma.user.findMany({
      take: take,
      skip: skip,
      where: {
        credentials: {
          status: CredentialsStatus.ACTIVE,
          AND: findUsersFilters,
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
