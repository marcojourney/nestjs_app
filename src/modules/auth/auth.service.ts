import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Client } from '../clients/entities/client.entity';
import { SessionRepository } from './session.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    private sessionRepository: SessionRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async getTokens(userId: number, userName: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username: userName,
          scope: 'read',
          iat: moment().unix(),
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '30m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username: userName,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      userId,
      accessToken,
      refreshToken,
    };
  }

  async basicGenerateToken(appId: string, appSecret: string) {
    const client = await this.clientRepository.findOne({
      where: { appId, appSecret },
    });

    if (!client) throw new NotFoundException('Client not found');

    const token = Buffer.from(`${appId}:${appSecret}`).toString('base64');
    return {
      token,
      scope: ['survey.create', 'survey.read'],
      expireIn: '30d',
    };
  }

  async basicVerifyToken(authorization: string) {
    if (authorization && authorization.startsWith('Basic ')) {
      const base64Credentials = authorization.slice('Basic '.length);
      const credentials = Buffer.from(base64Credentials, 'base64').toString(
        'utf-8',
      );
      const [appId, appSecret] = credentials.split(':');

      const client = await this.clientRepository.findOne({
        where: { appId, appSecret },
      });

      if (!client) {
        throw new UnauthorizedException('Authentication successful');
      }

      return { message: 'MESSAGE.OK' };
    }

    throw new UnauthorizedException('Unauthorized');
  }

  async jwtBasicGenerateToken(appId: string, appSecret: string) {
    const client = await this.clientRepository.findOne({
      where: { appId, appSecret },
    });

    if (!client) throw new NotFoundException('Client not found');

    const payload = {
      appId,
      appSecret,
      scope: ['survey.create', 'survey.read'],
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
    });

    return {
      token,
      scope: ['survey.create', 'survey.read'],
    };
  }

  async jwtBasicVerifyToken(authorization: string) {
    try {
      if (authorization && authorization.startsWith('Basic ')) {
        const basicToken = authorization.slice('Basic '.length);

        const payload = await this.jwtService.verifyAsync(basicToken, {
          secret: process.env.JWT_ACCESS_SECRET,
        });

        const { appId, appSecret } = payload;

        const client = await this.clientRepository.findOne({
          where: { appId, appSecret },
        });
        if (!client)
          throw new UnauthorizedException('Authentication successful');

        return { message: 'MESSAGE.OK' };
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async signIn(
    userName: string,
    password: string,
    ip: string,
    userAgent: string,
  ) {
    const user: User = await this.userRepository.findOne({
      where: { userName },
    });

    if (!user) {
      throw new NotFoundException(
        'Account does not exist. Please create an account or try again with a different username.',
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(
        'Invalid credentials. Please check your username and password and try again.',
      );
    }

    const tokens = await this.getTokens(user.id, user.userName);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  signOut(userId: number) {
    return this.userRepository.update({ id: userId }, { refreshToken: null });
  }

  async register(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash;
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  getHashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.getHashData(refreshToken);
    await this.userRepository.update(
      { id: userId },
      { refreshToken: hashedRefreshToken },
    );
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.userName);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  //Front End is able to request fingerprint by required options and generate identify key.
  async checkAuthenticate(accessToken: string, userAgent: string) {
    const session = await this.sessionRepository.findOne({
      where: { accessToken },
    });
    console.log('session:', session);
  }
}
