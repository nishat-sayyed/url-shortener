import { CSSProperties } from 'react';

export type UserCreds = {
  email: string;
  password: string;
};

export type PageVisit = {
  city: string;
  country: string;
  region: string;
  ip_address: string;
  visited_at: Date;
};

export type Url = {
  original: string;
  sanitizedLongUrl: string;
  createdOn: Date;
  pageVisits: PageVisit[];
  custom: boolean;
  code: string;
  id: string;
};

export type UrlDTO = Pick<Url, 'original' | 'custom' | 'code'>;

export type UrlsTableHeader = {
  id: string;
  label: string;
  minWidth: number;
};

export type CurrentUser = {
  id: string;
  createdOn: Date;
  email: string;
  token?: string;
};

export type AlertType = 'success' | 'info' | 'warning' | 'error' | undefined;

export type SnackBarAlert = {
  type: AlertType;
  msg: string;
};

export type HeaderStyle = CSSProperties;
export type RowStyle = CSSProperties;

export type Action = {
  type: string;
  payload: any;
};

export interface IUrlState {
  urls: Url[];
  isLoading: boolean;
  err: any;
}

export interface IStore {
  url: IUrlState;
  ui: IUiState;
  auth: IAuth;
}

export interface IUiState {
  snackbar: SnackBarAlert;
}

export interface IAuth {
  currentUser: CurrentUser | null;
  err: any;
  isLoading: boolean;
}

export interface IUrlTable {
  data: Url[];
  header: UrlsTableHeader[];
  stickyHeader: boolean;
  placeHolder?: string;
  headerStyle?: HeaderStyle;
  rowStyle?: RowStyle;
  isLoading: boolean;
  onDeleteUrl: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
  onViewUrl: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
}

export interface IPageVisitTable {
  data: PageVisit[];
}

export interface IPageVisitModal {
  data: PageVisit[];
  open: boolean;
  onClose: () => void;
}
