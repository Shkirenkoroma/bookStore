import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface IData {
  kind: string;
  id: number;
  etag: string;
  selfLink: string;
  volumeInfo: any;
}

interface IResponseData {
  data:IData[]
};

export const selectBook = createAsyncThunk<IResponseData, number | string>(
  'user/selectBook',
  async (queryParams) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${queryParams}`,
    );
    return response.data;
  },
);
