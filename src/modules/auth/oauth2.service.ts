import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { User } from '../users/entities/user.entity';
import { Client } from '../clients/entities/client.entity';

@Injectable()
export class OAuth2Service {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    private jwtService: JwtService
  ) {}

  async authorize(appId: string, redirectUri: string) {
    const client = await this.clientRepository.findOne({where: {appId}});
    if (client?.redirectUri !== redirectUri) {
      throw new BadRequestException('Invalid client or redirect URI.');
    }

    const payload = {
      appId
    };

    // A short life time token will be expired in 10mn
    const authorizationCode = await this.jwtService.signAsync(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '10m' });

    const redirectUrl = `${redirectUri}?code=${authorizationCode}`;
    return redirectUrl;
  }

  async login(authorizationCode: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(authorizationCode, { secret: process.env.JWT_ACCESS_SECRET });

      const accessToken = await this.jwtService.signAsync(
        {
          appI: decoded.appId
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '1d'
        }
      );

      return { accessToken };

    } catch (error) {
      throw new UnauthorizedException('Authorization code verification failed.');
    }
  }
}
