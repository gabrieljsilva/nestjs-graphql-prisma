import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from '@prisma/module';
import { REQUIRED_PERMISSIONS_METADATA_KEY } from '../constants/metadata/metadata.constants';
import { Credentials } from '@models';
import { PERMISSIONS } from '@enums';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<PERMISSIONS[]>(
      REQUIRED_PERMISSIONS_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const credentials = ctx.getContext().req.user as Credentials;

    const userPermissions = credentials.roles
      .map(({ permissions }) =>
        permissions.map((permission) => permission.name),
      )
      .flat();

    return requiredPermissions.every((requiredRole) =>
      userPermissions.includes(requiredRole),
    );
  }
}
