import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MailerModule } from '../../../../infra/mailer';
import { TokenModule } from '../token';

@Module({
  imports: [MailerModule, TokenModule],
  providers: [UserService, UserResolver],
  exports: [UserResolver],
})
export class UserModule {}
