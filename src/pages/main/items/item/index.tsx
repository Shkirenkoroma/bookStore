import { FC } from 'react';
import { unknown } from 'assets/constants';
import { BookItem } from '..';
import * as S from './index.styles';

export interface DataBook {
  title: string;
  authors: string[];
  description: string;
  categories: string[];
  imageLinks: { smallThumbnail: string };
}

export interface IPropsItem {
  dataBook: BookItem,
  handleClick: () => void;
}

export const Item: FC<IPropsItem> = ({ dataBook, handleClick }): JSX.Element => {
  const { authors, imageLinks, title, categories} = dataBook.volumeInfo;

  return (
    <S.Container onClick={handleClick}>
      <S.Image src={imageLinks?.smallThumbnail} alt="main poster of book" />
      <S.Text>
        <S.TextUpperCase>Наименование:</S.TextUpperCase>
        {title || unknown}
      </S.Text>
      <S.Text>
        <S.TextUpperCase>Категория:</S.TextUpperCase>
        {categories || unknown}
      </S.Text>
      <S.Text>
        <S.TextUpperCase>Автор:</S.TextUpperCase>
        {authors || unknown}
      </S.Text>
    </S.Container>
  );
};

export default Item;
