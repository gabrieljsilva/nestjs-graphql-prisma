import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from './packages';
import { GraphqlModule } from './infra/graphql';

@Module({
  imports: [GraphqlModule, PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
