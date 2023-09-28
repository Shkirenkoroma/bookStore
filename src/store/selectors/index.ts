import { DataState } from 'store/reducer';

interface DataSelectors {
  books:DataState;
}

export const bookId = (state: DataSelectors) => state.books?.idBook;

export const loadingDataCollectionBooks = (state: DataSelectors) => state.books?.loading;
//@ts-ignore
export const collectionDataBooks = (state: DataSelectors) => state.books.books?.items || [];

export const dataBook = (state: DataSelectors) => state.books?.book?.volumeInfo || {};

export const imageSource = (state: DataSelectors) => state.books?.book?.volumeInfo?.imageLinks?.smallThumbnail || '';

export const searchingQueryParams = (state: DataSelectors)  => state.books?.searchParams || '';
