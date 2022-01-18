import { PageViewEntity } from './analytics.entity';

export type PageViewSO = Pick<
  PageViewEntity,
  'city' | 'country' | 'region' | 'ip_address' | 'visited_at'
>;
