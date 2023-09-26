export const urlBookId = (state: any) => state.books.id;

export const isLoading = (state: any) => state.books?.loading;

export const state = (state: any) =>
  state.books.books.data?.items;

  export const bookData = (state: any) =>
  state.books.book.volumeInfo ?? [];
  
export const imageLinks = (state: any) =>
  state.books.book?.volumeInfo?.imageLinks?.smallThumbnail || ' ';

  export const descriptionSearchParams = (state:any)  => state.books.searchParams;
