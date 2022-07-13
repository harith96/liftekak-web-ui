import axios from 'axios';
import qs from 'qs';

import base64Encode from 'util/base64Encode';
import zipObj from 'util/zipObj';
import { getIdToken } from '../Authenticator';

const baseURL = process.env.REACT_APP_BFF;

const getHeaders = async ({ isBodyCompressed = false } = {}) => {
  const token = (await getIdToken()).getJwtToken();
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': isBodyCompressed ? 'text/plain' : 'application/json',
  };
};

const postRequest = async (url, data) => {
  return axios.post(`${baseURL}${url}`, data, {
    headers: await getHeaders(),
  });
};

const getRequest = async (url, params = {}) => {
  return axios.get(`${baseURL}${url}`, {
    headers: await getHeaders(),
    params,
    paramsSerializer: () => qs.stringify(params),
  });
};

const putRequest = async (url, data) => {
  return axios.put(`${baseURL}${url}`, data, {
    headers: await getHeaders(),
  });
};

const patchRequest = async (url, data) => {
  return axios.patch(`${baseURL}${url}`, data, {
    headers: await getHeaders(),
  });
};

const deleteRequest = async (url) => {
  return axios.delete(`${baseURL}${url}`, {
    headers: await getHeaders(),
  });
};

const putRequestCompressed = async (url, data) => {
  const encodedString = base64Encode(zipObj(data));
  return axios.put(`${baseURL}${url}`, encodedString, {
    headers: await getHeaders({ isBodyCompressed: true }),
  });
};

export { postRequest, getRequest, putRequest, deleteRequest, getHeaders, patchRequest, putRequestCompressed };
