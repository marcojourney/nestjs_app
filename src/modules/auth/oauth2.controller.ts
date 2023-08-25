import { Controller, Get, Query } from '@nestjs/common';
import { OAuth2Service } from './oauth2.service';

@Controller('oauth2')
export class OauthController {
    constructor(private oAuth2Service: OAuth2Service) {}

    @Get('/authorize')
    async authorize(
        @Query('appId') appId: string,
        @Query('redirectUri') redirectUri: string
    ) {
        const redirectUrl = await this.oAuth2Service.authorize(appId, redirectUri);
        return { redirectUrl };
    }

    @Get('/login')
    login(
        @Query('authorizationCode') authorizationCode: string
    ) {
        return this.oAuth2Service.login(authorizationCode);
    }
}
