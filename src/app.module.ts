import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/module/prisma.module';
import { AuthModule, TokenModule, UploadModule, UserModule } from './packages';
import { GraphqlModule } from './infra/graphql';

@Module({
  imports: [
    GraphqlModule,
    PrismaModule,
    TokenModule,
    UserModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
