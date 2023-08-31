import axios, { AxiosResponse } from 'axios';
import { IDataBooks } from 'redux/saga/sagaGetBookByID';
import { basicUrl } from '../constant';

export const getBooksApi = (queryParams: string):Promise<AxiosResponse<IDataBooks>> => {
  return axios.get(`${basicUrl}?q=${queryParams}&maxResults=40`);
};

export const getSortingBooksApi = (queryParams: string):Promise<AxiosResponse<IDataBooks>> => {
  return axios.get(`${basicUrl}?q=${queryParams}&maxResults=40`);
};

export const getBookByIDApi = (queryParams: string):Promise<AxiosResponse<IDataBooks>> => {
  return axios.get(`${basicUrl}/${queryParams}`);
};
