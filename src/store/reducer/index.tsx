import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getSearchingBooks } from './getSearchBooks';
import { selectSearchingBook } from './selectSearchingBook';

interface IState {
  books: any;
  book: any;
  filteredbook:any,
  loading: boolean;
  error: string;
  id: number;
  searchParams: any;
  queryParams: string;
}

const initialState: IState = {
  books: [],
  book: {},
  filteredbook:[],
  loading: false,
  error: '',
  id: 0,
  searchParams: '',
  queryParams: '',
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: {
    [getSearchingBooks.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = '';
      state.books = action.payload;
      state.filteredbook = action.payload
    },
    [getSearchingBooks.pending.type]: state => {
      state.loading = true;
    },
    [getSearchingBooks.rejected.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [selectSearchingBook.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = '';
      state.book = action.payload;
    },
    [selectSearchingBook.pending.type]: state => {
      state.loading = true;
    },
    [selectSearchingBook.rejected.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const booksReducer = booksSlice.reducer;

