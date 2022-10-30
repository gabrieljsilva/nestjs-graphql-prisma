import { Injectable } from '@nestjs/common';
import { TokenStatus, TokenType } from '@enums';
import { PrismaService } from '@prisma/module';
import { generateRandomToken, hashString } from '../../domain';

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
}
