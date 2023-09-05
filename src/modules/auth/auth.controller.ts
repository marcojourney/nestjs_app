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
import { RefreshTokenGuard } from './refresh-token.guard';

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

  @Post('v1/generate/basic-token')
  generateBasicToken(
    @Headers('appId') appId: string, 
    @Headers('appSecret') appSecret: string
  ) {
    return this.authService.basicGenerateToken(appId, appSecret);
  }

  @Post('v1/verify/basic-token')
  verifyBasicToken(
    @Headers('authorization') authorization: string
  ) {
    //Notes: If we use postman, you can use Auth:Basic Auth then authorization header (Basic {token}) will be automatically generated when you send the request
    return this.authService.basicVerifyToken(authorization);
  }

  @Post('v2/generate/basic-token')
  jwtGenerateBasicToken(
    @Headers('appId') appId: string, 
    @Headers('appSecret') appSecret: string
  ) {
    return this.authService.jwtBasicGenerateToken(appId, appSecret);
  }

  @Post('v2/verify/basic-token')
  jwtVerifyBasicToken(
    @Headers('authorization') authorization: string
  ) {
     return this.authService.jwtBasicVerifyToken(authorization);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(
    @Body('userId') userId: number,
    @Body('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('check/authentication')
  checkAuthentication(
    @Req() req: Request,
    @Query('accessToken') accessToken: string,
  ) {
    return this.authService.checkAuthenticate(accessToken, req.headers['user-agent']);
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
