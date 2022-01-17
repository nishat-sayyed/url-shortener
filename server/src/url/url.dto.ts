import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';
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
  sanitizedLongUrl: string;
  createdOn: Date;
  custom: boolean;
  author: UserSO;
  token?: string;
};
