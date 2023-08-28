import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { TokenPayload } from 'src/types/token.payload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);
    
    const decoded: TokenPayload = plainToClass(
      TokenPayload,
      this.jwtService.decode(accessToken),
    );

    if (!decoded) {
      throw new UnauthorizedException();
    }

    if (!decoded.sub) {
      throw new UnauthorizedException('Invalid access token');
    }

    if (!decoded.scope || !decoded.scope.includes('read')) {
      throw new ForbiddenException('Insufficient privileges');
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
