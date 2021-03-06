import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.autorization) return false;

    request.user = this.verifyToken(request.headers.autorization);
    return true;
  };

  private verifyToken = (auth: string) => {
    const authHeader = auth.split(' ');
    if (authHeader[0] !== 'Bearer') {
      throw new HttpException('Unauthorized token', HttpStatus.UNAUTHORIZED);
    }
    try {
      const token = authHeader[1];
      const decode = verify(token, process.env.SECRET);
      return decode;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  };
}
