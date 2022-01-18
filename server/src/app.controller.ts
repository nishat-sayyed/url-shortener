import { Controller, Get, Param, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { AppService } from './app.service';
import { UrlService } from './url/url.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly urlService: UrlService,
  ) {}

  @Get('/start')
  getWelcomeMsg() {
    return this.appService.getWelcomeMsg();
  }

  @Get('/:code')
  async getUrlByCode(
    @Param('code') code: string,
    @Response() res: ExpressResponse,
  ) {
    const url = this.urlService.getUrlByCode(code);
    return res.redirect((await url).sanitizedLongUrl);
  }
}
