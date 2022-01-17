import * as types from '../actions/url/types';

import { IUrlState, Action } from '../../types';

const initialState: IUrlState = {
  urls: [],
  isLoading: true,
  err: null
};

export const urlReducer = (
  state = initialState,
  action: Action
): IUrlState => {
  switch (action.type) {
    case types.COMPLETE_URL:
      return {
        ...state
      };
    case types.ADD_URL:
      return {
        ...state
      };
    case types.DELETE_URL:
      return {
        ...state
      };
    case types.GET_ALL_URL:
      return {
        ...state,
        isLoading: true
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    case types.ADD_URL_SUCCESS:
      return {
        ...state,
        urls: [action.payload, ...state.urls],
        isLoading: false,
        err: null
      };
    case types.DELETE_URL_SUCCESS:
      return {
        ...state,
        urls: [...state.urls.filter((item) => item.id !== action.payload)],
        isLoading: false,
        err: null
      };
    case types.GET_ALL_URLS_SUCCESS:
      return {
        ...state,
        urls: action.payload,
        isLoading: false,
        err: null
      };
    case types.CLEAR_URLS:
      return {
        urls: [],
        isLoading: true,
        err: null
      };
    default:
      return state;
  }
};
