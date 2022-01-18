import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageViewEntity } from './analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(PageViewEntity)
    private pageViewsRepository: Repository<PageViewEntity>,
    private httpService: HttpService,
  ) {}

  async track(path: string, ipAddress: string) {
    const { data } = await this.httpService
      .get(`https://ipinfo.io/${ipAddress}/json`)
      .toPromise();
    const pageView = this.pageViewsRepository.create({
      path,
      ip_address: ipAddress,
      country: data.country,
      city: data.city,
      region: data.region,
    });
    await this.pageViewsRepository.save(pageView);
  }

  getPageViewData() {
    return this.pageViewsRepository.find();
  }
}
