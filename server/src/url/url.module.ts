import { Module, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlEntity } from './url.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity, UserEntity])],
  exports: [UrlService],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
