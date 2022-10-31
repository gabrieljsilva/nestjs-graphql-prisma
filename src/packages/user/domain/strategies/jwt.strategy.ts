import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module';
import { JwtPayloadInterface } from '../../../../domain/interfaces/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadInterface) {
    return this.prisma.credentials.findFirst({
      where: {
        id: payload.credentialsId,
      },
      select: {
        roles: {
          select: { permissions: true },
        },
      },
    });
  }
}
