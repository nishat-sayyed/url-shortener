import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UrlModule } from './url/url.module';
import { UserModule } from './user/user.module';

import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpErrorFilter } from './shared/http-error.filter';
import { ValidationPipe } from './shared/validation.pipe';
import { AnalyticsModule } from './analytics/analytics.module';
import { AnalyticsMiddleware } from './analytics/analytics.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(), UrlModule, UserModule, AnalyticsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AnalyticsMiddleware)
      .exclude('start')
      .forRoutes(AppController);
  }
}
