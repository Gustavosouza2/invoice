import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type JwtPayload = {
  sub: string;
  email: string;
  name?: string;
};

type RequestLike = {
  headers: Record<string, unknown>;
  user?: unknown;
};

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestLike>();
    const token = this.extractToken(request.headers);
    if (!token) throw new UnauthorizedException('Unauthorized');

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET ?? 'dev_jwt_secret',
      });
      request.user = {
        userId: payload.sub,
        email: payload.email,
        name: payload.name,
      };
      return true;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  private extractToken(headers: Record<string, unknown>): string | null {
    const raw = (headers['authorization'] as string | undefined)?.trim();
    if (!raw) return null;
    return raw.toLowerCase().startsWith('bearer ') ? raw.slice(7).trim() : raw;
  }
}
