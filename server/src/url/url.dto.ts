import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';
import { PageViewSO } from 'src/analytics/analytics.dto';
import { UserSO } from '../user/user.dto';

export class UrlDTO {
  @IsUrl()
  original: string;

  @IsBoolean()
  custom: boolean;

  @IsOptional()
  @IsString()
  code: string;
}

export type UrlSO = {
  id: string;
  custom: boolean;
  sanitizedLongUrl: string;
  author: UserSO;
  pageVisits?: PageViewSO[];
  createdOn: Date;
  token?: string;
};
