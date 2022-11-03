import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException } from '../exceptions/invalid-token-exception';
import { IS_PUBLIC_QUERY_METADATA_KEY } from '@constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_QUERY_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    return isPublic || super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

  getRequest(context: ExecutionContext) {
    if (context.getType() !== 'http') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    } else {
      return (context as any).args?.[0];
    }
  }
}
