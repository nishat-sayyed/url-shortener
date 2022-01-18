import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlEntity } from './url.entity';
import { UserEntity } from '../user/user.entity';
import { AnalyticsModule } from 'src/analytics/analytics.module';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity, UserEntity]), AnalyticsModule],
  exports: [UrlService],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
