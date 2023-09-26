import { FC } from 'react';
import { unknown } from 'assets/constants';
import * as S from './index.styles';

export interface IVolumeInfo {
  title: string;
  authors: string[];
  description: string;
  categories: string[];
  imageLinks: { smallThumbnail: string };
}

export interface IPropsItem {
  dataBook: {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: IVolumeInfo;
  };
  handleClick: () => void;
}

export const Item: FC<IPropsItem> = ({ dataBook, handleClick }): JSX.Element => {
  const { authors, imageLinks, title, categories} = dataBook.volumeInfo;

  return (
    <S.Container onClick={handleClick}>
      <S.Image src={imageLinks.smallThumbnail} alt="label of book" />
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
