import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { basicUrl } from 'assets/constants';
import { ResponseData } from './getBooks';

export const selectBook = createAsyncThunk<ResponseData, number | string>(
  'user/selectBook',
  async (queryParams) => {
    const response = await axios.get(
      `${basicUrl}/${queryParams}`,
    );
    return response.data;
  },
);
