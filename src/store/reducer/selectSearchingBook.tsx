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

export const selectSearchingBook = createAsyncThunk<IResponseData, number>(
  'user/fetchAll',
  async (id) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`,
    );
    return response.data;
  },
);
