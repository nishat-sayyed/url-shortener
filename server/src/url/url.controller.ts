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
} from '@nestjs/common';

import { UrlService } from './url.service';
import { UrlDTO } from './url.dto';
import { AuthGuard } from '../shared/auth.guard';

@UseGuards(new AuthGuard())
@Controller('api/url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Get('/all')
  getAllUrls(@Req() req) {
    const userId = req.user.id;
    return this.urlService.getAllUrls(userId);
  }

  @Post('/create')
  createUrl(@Req() req, @Body() data: UrlDTO) {
    const userId = req.user.id;
    return this.urlService.createUrl(userId, data);
  }

  @Patch('/update')
  updateUrl(
    @Query('id') id: string,
    @Req() req,
    @Body() data: Partial<UrlDTO>,
  ) {
    const userId = req.user.id;
    return this.urlService.updateUrl(userId, id, data);
  }

  @Delete('/delete')
  deleteUrl(@Req() req, @Query('id') id: string) {
    const userId = req.user.id;
    return this.urlService.deleteUrl(userId, id);
  }
}
