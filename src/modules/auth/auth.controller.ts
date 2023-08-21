import {
  Headers,
  Controller,
  Post,
  Req,
  HttpCode,
  HttpStatus,
  Ip,
  Body,
  Get,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshTokenGuard } from './refreshToken.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Req() req: Request,
    @Ip() ip: string,
    @Headers('username') username: string,
    @Headers('password') password: string,
  ) {
    const userAgent = req.headers['user-agent'];
    return this.authService.signIn(username, password, ip, userAgent);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
    @Query('userId') userId: number,
    @Query('refreshToken') refreshToken: string,
    ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('logout')
  logout(@Query('userId') userId: number) {
    this.authService.signOut(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
