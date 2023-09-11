import axios, { AxiosResponse } from 'axios';
import { basicUrl } from '../constant';

export const getBooksApi = (queryParams: string):Promise<AxiosResponse<any>> => {
  return axios.get(`${basicUrl}?q=${queryParams}&maxResults=40`);
};

export const getSortingBooksApi = (queryParams: string):Promise<AxiosResponse<any>> => {
  return axios.get(`${basicUrl}?q=${queryParams}&maxResults=40`);
};

export const getBookByIDApi = (queryParams: string):Promise<AxiosResponse<any>> => {
  return axios.get(`${basicUrl}/${queryParams}`);
};
