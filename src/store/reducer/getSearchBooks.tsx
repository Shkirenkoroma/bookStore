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
}

export const getSearchingBooks = createAsyncThunk<IResponseData, string>(
  'user/fetchAll',
  async (inputString) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${inputString}&maxResults=40`,
    );
    return response.data;
  },
);
