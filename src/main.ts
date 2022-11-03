import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from '@prisma/module/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { InvalidEntriesException } from '@exceptions';
import { JwtAuthGuard } from './packages/user/domain';
import { PermissionGuard } from './packages/user/domain';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new InvalidEntriesException(errors),
      stopAtFirstError: true,
    }),
  );

  const prismaService = app.get(PrismaService);

  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  app.useGlobalGuards(new PermissionGuard(new Reflector()));

  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}

bootstrap();
