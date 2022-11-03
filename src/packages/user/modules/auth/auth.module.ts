import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from '../token';
import { JwtStrategy } from '../../domain';

@Module({
  imports: [
    TokenModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthResolver],
})
export class AuthModule {}
