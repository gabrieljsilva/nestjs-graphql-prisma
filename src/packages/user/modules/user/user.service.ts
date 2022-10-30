import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module/prisma.service';
import { CreateUserDto, UpdateUserDto } from '@dtos';
import {
  AlreadyExistsException,
  NotFoundException,
  OutOfRangeException,
} from '@exceptions';
import { RESOURCE, TokenType } from '@enums';
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
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
    private readonly tokenService: TokenService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const alreadyRegisteredUser = await this.prismaService.user.findFirst({
      where: { credentials: { email: createUserDto.email } },
    });

    if (alreadyRegisteredUser) {
      throw new AlreadyExistsException(RESOURCE.USER, {
        email: createUserDto.email,
      });
    }

    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        credentials: {
          create: {
            email: createUserDto.email,
            password: hashString(createUserDto.password),
          },
        },
      },
    });

    const token = await this.tokenService.createToken(
      TokenType.CONFIRM_ACCOUNT,
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
    return this.prismaService.user.findFirst({
      where: { id },
    });
  }

  async getManyUsers(
    { skip, take }: PaginationInput,
    filters?: UserFilters,
  ): Promise<UserPaginated> {
    const totalItemsCount = await this.prismaService.user.count();

    if (skip < 0 || take <= 0) {
      throw new OutOfRangeException(take, skip, totalItemsCount);
    }

    const prismaQueryFilter = new PrismaFilterAdapter();
    const parsedFilters = filters && prismaQueryFilter.getQuery(filters);
    const users = await this.prismaService.user.findMany({
      take: take,
      skip: skip,
      where: parsedFilters,
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
    return this.prismaService.credentials.findFirst({
      where: { user_id: id },
    });
  }

  async updateUserById({ id, ...updateUserDto }: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(RESOURCE.USER, { id });
    }

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
