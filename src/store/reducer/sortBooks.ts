import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface IData {
  kind: string;
  id: number;
  etag: string;
  selfLink: string;
  volumeInfo: any;
};

interface IResponseData {
  data:IData[]
};

export const sortBooks = createAsyncThunk<IResponseData, number | string>(
  'user/sortBooks',
  async (queryParams) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${queryParams}&maxResults=40`,
    );
    return response.data;
  },
);
