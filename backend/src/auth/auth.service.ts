import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async login(answer: string) {
        const secretAnswer =
            this.configService.getOrThrow<string>('SECRET_ANSWER');

        if (answer !== secretAnswer) {
            throw new UnauthorizedException('Incorrect answer');
        }

        const accessToken = await this.jwtService.signAsync({
            role: 'ceo',
        });

        return {
            accessToken,
        };
    }
}