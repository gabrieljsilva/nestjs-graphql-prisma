import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/module/prisma.module';
import { AuthModule, TokenModule, UploadModule, UserModule } from './packages';
import { GraphqlModule } from './infra/graphql';
import { GraphqlFilterModule } from '@gabrieljsilva/nestjs-graphql-filter';
import { PrismaFilterAdapter } from '@gabrieljsilva/nestjs-graphql-filter-adapter-prisma';

@Module({
  imports: [
    GraphqlFilterModule.forRoot(PrismaFilterAdapter),
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
