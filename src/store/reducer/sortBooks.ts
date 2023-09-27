import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { basicUrl } from 'assets/constants';
import { ResponseData } from './getBooks';

export const sortBooks = createAsyncThunk<ResponseData, number | string>(
  'user/sortBooks',
  async (queryParams) => {
    const response = await axios.get(
      `${basicUrl}?q=${queryParams}&maxResults=40`,
    );
    return response.data;
  },
);
