import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<Request>();

        const token = this.extractToken(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            await this.jwtService.verifyAsync(token, {
                secret:
                    this.configService.getOrThrow<string>('JWT_SECRET'),
            });
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractToken(
        request: Request,
    ): string | undefined {
        const [type, token] =
        request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer'
            ? token
            : undefined;
    }
}