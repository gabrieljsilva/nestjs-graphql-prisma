import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/module/prisma.module';
import { AuthModule, TokenModule, UserModule } from './packages';
import { GraphqlModule } from './infra/graphql';
import { MailerModule } from './infra/mailer';

@Module({
  imports: [
    GraphqlModule,
    PrismaModule,
    MailerModule.forRoot(),
    TokenModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
