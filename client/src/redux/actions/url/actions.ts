import { Dispatch } from 'react';

import * as types from './types';

import { Url, UrlDTO } from '../../../types';
import { setSnackBar } from '../ui/actions';

import * as urlAPI from '../../../api/url';

//----- GET URLS ----- //
const createGetAllUrl = () => {
  return {
    type: types.GET_ALL_URL
  };
};

const getAllUrlsSuccess = (data: Url[]) => {
  return {
    type: types.GET_ALL_URLS_SUCCESS,
    payload: data
  };
};

export const getAllUrls = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createGetAllUrl());
    const res = await urlAPI.getAllUrls();
    dispatch(getAllUrlsSuccess(res.data));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- COMPLETE URL ----- //
const createCompleteUrl = () => {
  return {
    type: types.COMPLETE_URL
  };
};

const completeUrlSuccess = (data: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.COMPLETE_URL_SUCCESS,
    payload: data
  });
  dispatch(
    setSnackBar({
      type: 'info',
      msg: `Url was updated`
    })
  );
};

export const completeUrl = (id: string, checked: boolean) => async (
  dispatch: Dispatch<any>
) => {
  try {
    dispatch(createCompleteUrl());
    await urlAPI.completeUrl(id, checked);
    dispatch(completeUrlSuccess({ id, checked }));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- ADD URL ----- //
const createAddUrl = () => {
  return {
    type: types.ADD_URL
  };
};
const addUrlSuccess = (data: Url) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.ADD_URL_SUCCESS,
    payload: data
  });
  dispatch(setSnackBar({ type: 'success', msg: `URL was added` }));
};
export const addUrl = (url: UrlDTO) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createAddUrl());
    const res = await urlAPI.addUrl(url);
    dispatch(addUrlSuccess(res.data));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- DELETE URL ----- //
const createDeleteUrl = () => {
  return {
    type: types.DELETE_URL
  };
};

const deleteUrlSuccess = (id: string) => (disptach: Dispatch<any>) => {
  disptach({
    type: types.DELETE_URL_SUCCESS,
    payload: id
  });
  disptach(setSnackBar({ type: 'info', msg: 'Url deleted successfully' }));
};

export const deleteUrl = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(createDeleteUrl());
    await urlAPI.deleteUrl(id);
    dispatch(deleteUrlSuccess(id));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

const catchRequestErr = (err: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.REQUEST_FAILURE,
    payload: err.message
  });
  dispatch(setSnackBar({ type: 'error', msg: err.message }));
};

export const clearUrls = () => {
  return {
    type: types.CLEAR_URLS
  };
};
