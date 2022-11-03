import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/module/prisma.module';
import { AuthModule, TokenModule, UserModule } from './packages';
import { GraphqlModule } from './infra/graphql';
import { UploadModule } from './packages/upload/modules/upload';

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
