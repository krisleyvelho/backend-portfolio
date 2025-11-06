
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public-decorator';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const requestHeaders = context.switchToHttp().getRequest()?.headers;

    if(!requestHeaders?.authorization) {
      throw new UnauthorizedException('No token provided');
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // allow all public requests
    }

    // validate session with JWT
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if(info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Expired token. Try to login again');
    }
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}