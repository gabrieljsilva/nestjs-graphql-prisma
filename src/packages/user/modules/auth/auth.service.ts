import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ActivateAccountDto, LoginDto } from '@dtos';
import { NotFoundException, PasswordNotMatchException } from '@exceptions';
import { CredentialsStatus, RESOURCE, TokenType } from '@enums';
import { PrismaService } from '@prisma/module';
import { compareHashString } from '../../domain';
import { TokenService } from '../token';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ email, password }: LoginDto) {
    const credentials = await this.validateCredentialsOrThrowError(
      email,
      password,
    );

    return this.jwtService.sign({ credentialsId: credentials.id });
  }

  async validateCredentialsOrThrowError(email: string, password: string) {
    const credentials = await this.prisma.credentials.findFirst({
      where: { email, status: CredentialsStatus.ACTIVE },
    });

    if (!credentials) {
      throw new NotFoundException(RESOURCE.USER, { email });
    }

    const passwordMatches = compareHashString(credentials.password, password);

    if (!passwordMatches) {
      throw new PasswordNotMatchException();
    }

    return credentials;
  }

  async activateAccount(activateAccountDto: ActivateAccountDto) {
    const { email, token } = activateAccountDto;
    const credentials = await this.prisma.credentials.findFirst({
      where: { email, status: CredentialsStatus.WAITING_CONFIRMATION },
    });

    if (!credentials) {
      throw new NotFoundException(RESOURCE.USER, {
        email,
        status: CredentialsStatus.WAITING_CONFIRMATION,
      });
    }

    await this.tokenService.validateTokenOrThrowException(
      TokenType.ACCOUNT_CONFIRMATION,
      token,
      email,
    );

    return this.prisma.credentials.update({
      where: { email },
      data: {
        status: CredentialsStatus.ACTIVE,
      },
    });
  }
}
