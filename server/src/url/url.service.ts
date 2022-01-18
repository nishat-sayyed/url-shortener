import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generate } from 'shortid';
import { Repository } from 'typeorm';
import { UrlEntity } from './url.entity';
import { UrlDTO, UrlSO } from './url.dto';
import { UserEntity } from '../user/user.entity';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { PageViewSO } from 'src/analytics/analytics.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private urlRepository: Repository<UrlEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly analyticsService: AnalyticsService,
  ) {}

  private responseOject = (
    url: UrlEntity,
    pageVisits?: PageViewSO[],
  ): UrlSO => {
    return {
      ...url,
      sanitizedLongUrl: url.original.includes('http')
        ? url.original
        : `https://${url.original}`,
      pageVisits,
      author: url.author ? url.author.sanitizeObject() : null,
    };
  };

  private verifyOwnership = (url: UrlEntity, userId: string) => {
    if (url.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  };

  private getCode = (data: Partial<UrlDTO>): string => {
    let code: string = null;
    if (data.custom) {
      code = data.code;
    } else {
      code = generate();
    }
    return code;
  };

  getAllUrls = async (userId: string): Promise<UrlSO[]> => {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const urls = await this.urlRepository.find({
      where: { author: user },
      order: { createdOn: 'DESC' },
      relations: ['author'],
    });
    const pageViews = await this.analyticsService.getPageViewData();
    return urls.map(url => {
      this.verifyOwnership(url, userId);
      return this.responseOject(
        url,
        pageViews.filter(pageView => pageView.path === `/${url.code}`),
      );
    });
  };

  getUrlByCode = async (code: string): Promise<UrlSO> => {
    const url = await this.urlRepository.findOne({ code });
    if (!url) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);

    return this.responseOject(url);
  };

  createUrl = async (userId: string, data: UrlDTO): Promise<UrlSO> => {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const code = this.getCode(data);
    const url = await this.urlRepository.findOne({ code });

    if (url)
      throw new HttpException(
        'Code already exists. Please try again.',
        HttpStatus.CONFLICT,
      );

    const newUrl = this.urlRepository.create({
      original: data.original,
      code,
      custom: data.custom,
      author: user,
    });
    await this.urlRepository.save(newUrl);

    return this.responseOject(newUrl, []);
  };

  updateUrl = async (
    userId: string,
    id: string,
    data: Partial<UrlDTO>,
  ): Promise<UrlSO> => {
    const url = await this.urlRepository.findOne(
      { id },
      { relations: ['author'] },
    );

    if (!url) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    this.verifyOwnership(url, userId);

    if (data.hasOwnProperty('custom')) {
      const code = this.getCode(data);
      await this.urlRepository.update({ id }, { custom: data.custom, code });
    }
    if (data.original) {
      await this.urlRepository.update({ id }, { original: data.original });
    }

    return this.responseOject(url);
  };

  deleteUrl = async (userId: string, id: string): Promise<UrlSO> => {
    const url = await this.urlRepository.findOne(
      { id },
      { relations: ['author'] },
    );

    if (!url) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    this.verifyOwnership(url, userId);

    await this.urlRepository.remove(url);

    return this.responseOject(url);
  };
}
