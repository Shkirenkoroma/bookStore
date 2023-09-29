import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BookItem } from 'pages/main/items';
import { getBooks } from './getBooks';
import { selectBook } from './selectBook';
import { sortBooks } from './sortBooks';

export interface DataState {
  books: BookItem[];
  book: BookItem;
  filteredbooks: BookItem[];
  loading: boolean;
  error: string;
  idBook: string;
  searchParams: string;
};

const initialState: DataState = {
  books: [],
  //@ts-ignore
  book: {},
  filteredbooks: [],
  loading: false,
  error: '',
  idBook: '',
  searchParams: '',
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getSearchingString: (state: DataState, action: PayloadAction<string>) => {
      state.searchParams = action.payload;
    },
    getSelectBookId:(state: DataState, action:PayloadAction<string>) => {
      state.idBook = action.payload;
    },
  },
  extraReducers: {
    [getBooks.fulfilled.type]: (state: DataState, action: PayloadAction<BookItem[]>) => {
      state.error = '';
      state.books = action.payload;
      state.filteredbooks = action.payload;
      state.loading = false;
    },
    [getBooks.pending.type]: state => {
      state.loading = true;
    },
    [getBooks.rejected.type]: (state: DataState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [selectBook.fulfilled.type]: (
      state: DataState,
      action: PayloadAction<BookItem>,
    ) => {
      state.loading = false;
      state.error = '';
      state.book = action.payload;
      state.idBook = action.payload.id;
    },
    [selectBook.pending.type]: (state: DataState)=> {
      state.loading = true;
    },
    [selectBook.rejected.type]: (
      state: DataState,
      action: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [sortBooks.fulfilled.type]:(state: DataState, action:PayloadAction<BookItem[]>) => {
      state.loading = false;
      state.filteredbooks = action.payload
      state.books = action.payload;
    },
    [sortBooks.pending.type]:(state: DataState) => {
      state.loading = true
    },
    [sortBooks.rejected.type]:(state: DataState, action:PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getSearchingString, getSelectBookId } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
