import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getSearchingBooks } from './getSearchBooks';
import { selectSearchingBook } from './selectSearchingBook';

interface IState {
  books: any;
  book: any;
  loading: boolean;
  error: string;
  id: number;
  searchParams: any;
  queryParams: string;
}

const initialState: IState = {
  books: [],
  book: {},
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    getBooks: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.searchParams = action.payload;
    },
    setBooks: (state, action: PayloadAction<any>) => {
      state.books = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    getSortingBooks: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.queryParams = action.payload;
    },
    getIdBook: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setBook: (state, action: PayloadAction<any>) => {
      state.book = action.payload;
    },
  },
  extraReducers: {
    [getSearchingBooks.fulfilled.type]: (state, action: PayloadAction<any>) => {
      console.log('dad', action.payload)
      state.loading = false;
      state.error = '';
      state.books = action.payload;
    },
    [getSearchingBooks.pending.type]: state => {
      state.loading = true;
    },
    [getSearchingBooks.rejected.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [selectSearchingBook.fulfilled.type]: (state, action: PayloadAction<any>) => {
      console.log('dad', action.payload)
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
export const {
  setLoading,
  getBooks,
  setBooks,
  setBook,
  setError,
  getSortingBooks,
  getIdBook,
} = booksSlice.actions;
