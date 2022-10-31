import { Injectable } from '@nestjs/common';
import { TokenStatus, TokenType } from '@enums';
import { PrismaService } from '@prisma/module';
import {
  compareHashString,
  generateRandomToken,
  hashString,
} from '../../domain';
import { InvalidTokenException } from '@exceptions';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  async createToken(type: TokenType, email: string) {
    const token = await generateRandomToken(5);
    const hashedToken = hashString(token);

    await this.prisma.token.create({
      data: {
        token: hashedToken,
        type: type,
        status: TokenStatus.UNUSED,
        credentials: {
          connect: { email: email },
        },
      },
    });

    return token;
  }

  async validateTokenOrThrowException(
    type: TokenType,
    tokenString: string,
    email: string,
  ) {
    const token = await this.prisma.token.findFirst({
      where: {
        type: type,
        credentials: {
          email: email,
        },
      },
    });

    if (!token) {
      throw new InvalidTokenException();
    }

    const tokenMatches = compareHashString(token.token, tokenString);

    if (!tokenMatches) {
      throw new InvalidTokenException();
    }

    return true;
  }
}
