import axios from 'axios';
import { Url, UrlDTO } from '../../types';

export const getAllUrls = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/url/all'
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const completeUrl = async (id: string, checked: boolean) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/url/update',
      params: { id },
      data: { completed: checked }
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const addUrl = async (data: UrlDTO) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/url/create',
      data
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const deleteUrl = async (id: string) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/url/delete',
      params: { id }
    });
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};
