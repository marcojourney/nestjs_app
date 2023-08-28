import { Controller, Body, Get, Query } from '@nestjs/common';
import { OAuth2Service } from './oauth2.service';
import { RegisterClientBody } from './register.body';

@Controller('oauth2')
export class OauthController {
  constructor(private oAuth2Service: OAuth2Service) {}

  @Get('/register')
  register(@Body() registerClientBody: RegisterClientBody) {
    return this.oAuth2Service.register(registerClientBody);
  }

<<<<<<< HEAD
  @Get('/authorize')
  authorize(
    @Query('appId') appId: string,
    @Query('redirectUri') redirectUri: string,
  ) {
    return this.oAuth2Service.authorize(appId, redirectUri);
  }
=======
    @Get('/authorize')
    authorize(
        @Query('appId') appId: string,
        @Query('scope') scope: string,
        @Query('redirectUri') redirectUri: string
    ) {
        return this.oAuth2Service.authorize(appId, redirectUri);
    }
>>>>>>> 325948023d20288f23eef2384a1c854a80d6a076

  @Get('/token')
  getToken(@Query('authorizationCode') authorizationCode: string) {
    return this.oAuth2Service.login(authorizationCode);
  }
}
