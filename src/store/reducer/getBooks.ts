import { createAsyncThunk } from '@reduxjs/toolkit';
import { basicUrl } from 'assets/constants';
import axios from 'axios';
import { BookItem } from 'pages/main/items';

export interface ResponseData {
  data:BookItem[]
};

export const getBooks = createAsyncThunk<ResponseData, string>(
  'user/getBooks',
  async (searchingWord) => {
    const response = await axios.get(
      `${basicUrl}?q=${searchingWord}&maxResults=40`,
    );
    return response.data;
  },
);
