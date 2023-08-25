import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Session } from './session.entity';
import { User } from '../users/entities/user.entity';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { Client } from '../clients/entities/client.entity';
import { OauthController } from './oauth2.controller';
import { OAuth2Service } from './oauth2.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, User, Session]),
    JwtModule.register({
      global: true,
      secret: 'kolap',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController, OauthController],
  providers: [
    AuthService,
    OAuth2Service,
    JwtService,
    ConfigService,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ],
})
export class AuthModule {}
