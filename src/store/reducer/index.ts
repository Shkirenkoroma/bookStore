import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getBooks } from './getBooks';
import { selectBook } from './selectBook';
import { sortBooks } from './sortBooks';

interface IState {
  books: any;
  book: any;
  filteredbook: any;
  loading: boolean;
  error: string;
  id: number | string;
  searchParams: any;
  queryParams: string;
};

const initialState: IState = {
  books: [],
  book: {},
  filteredbook: [],
  loading: false,
  error: '',
  id: 0,
  searchParams: '',
  queryParams: '',
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getSearchingString: (state: IState, action: PayloadAction<string>) => {
      state.searchParams = action.payload;
    },
    getSelectBookId:(state:IState, action:PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
  extraReducers: {
    [getBooks.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = '';
      state.books = action.payload;
      state.filteredbook = action.payload;
    },
    [getBooks.pending.type]: state => {
      state.loading = true;
    },
    [getBooks.rejected.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [selectBook.fulfilled.type]: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.loading = false;
      state.error = '';
      state.book = action.payload;
      state.id = action.payload.id;
    },
    [selectBook.pending.type]: state => {
      state.loading = true;
    },
    [selectBook.rejected.type]: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [sortBooks.fulfilled.type]:(state, action:PayloadAction<any>) => {
      state.loading = false;
      state.books = action.payload;
      state.filteredbook = action.payload
    },
    [sortBooks.pending.type]:state => {
      state.loading = true
    },
    [sortBooks.rejected.type]:(state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getSearchingString, getSelectBookId } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
