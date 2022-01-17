import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';

import { UrlService } from './url.service';
import { UrlDTO } from './url.dto';
import { AuthGuard } from '../shared/auth.guard';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @UseGuards(new AuthGuard())
  @Get('/all')
  getAllUrls(@Req() req) {
    const userId = req.user.id;
    return this.urlService.getAllUrls(userId);
  }

  @Get('/:code')
  getUrlByCode(@Param('code') code: string) {
    return this.urlService.getUrlByCode(code);
  }

  @UseGuards(new AuthGuard())
  @Post('/create')
  createUrl(
    @Req() req,
    @Body() data: UrlDTO
  ) {
    const userId = req.user.id;
    return this.urlService.createUrl(userId, data);
  }
  
  @UseGuards(new AuthGuard())
  @Patch('/update')
  updateUrl(
    @Query('id') id: string,
    @Req() req,
    @Body() data: Partial<UrlDTO>,
  ) {
    const userId = req.user.id;
    return this.urlService.updateUrl(userId, id, data);
  }

  @UseGuards(new AuthGuard())
  @Delete('/delete')
  deleteUrl(@Req() req, @Query('id') id: string) {
    const userId = req.user.id;
    return this.urlService.deleteUrl(userId, id);
  }
}
