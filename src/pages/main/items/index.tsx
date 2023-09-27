import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Button } from 'components/button';
import { loadingDataCollectionBooks } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectBook } from 'store/reducer/selectBook';
import Item, { DataBook } from './item';
import * as S from './index.styles';

export interface BookItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: DataBook;
}

export interface ItemsProps {
  selectCategory: string;
  selectOrder: string;
}

export interface DataItemOfBooksCollection {
  volumeInfo: DataBook;
}

const Items: FC<ItemsProps> = ({ selectCategory, selectOrder }): JSX.Element => {
  const [arrayDataBooks, setArrayDataBooks] = useState<BookItem[]>([]);
  const [filteredArrayDataBooks, setFilteredArrayDataBooks] = useState<BookItem[]>([]);
  const [visible, setVisible] = useState<number>(30);
  const dispatch = useAppDispatch();
  const collectionBooks = useAppSelector(state => state.books?.books);
  const filteredCollectionBooks = useAppSelector(state => state.books?.filteredbooks);
  console.log('filteredcoa', filteredCollectionBooks)
  const loadingCollectionBooks = useAppSelector(loadingDataCollectionBooks);

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 30);
  };

  useEffect(() => {
    setArrayDataBooks(collectionBooks);
    setFilteredArrayDataBooks(filteredCollectionBooks);
  }, [collectionBooks, selectOrder]);


  useEffect(() => {
    if (selectCategory === 'All') {
      if (!!collectionBooks) setFilteredArrayDataBooks(collectionBooks);
    } else {
      if (!!collectionBooks) {
        setFilteredArrayDataBooks(filterFunction());
      }
    }
  }, [selectCategory]);

  const filterFunction = () => {
    return arrayDataBooks?.filter((element: DataItemOfBooksCollection) => {
      const sortingElement = element.volumeInfo.categories?.[0];
      const isHasMatches = sortingElement?.includes(selectCategory);
      return isHasMatches;
    });
  };

  const handleIdBook = (queryIdParams: string): void => {
    dispatch(selectBook(queryIdParams));
  };

  return (
    <S.Container>
      {loadingCollectionBooks ? (
        <MagnifyingGlass
          visible
          height="110"
          width="110"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{ marginTop: '250px' }}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#bb7d81"
        />
      ) : (
        <>
          <S.Text>
            Found<S.Counter>{filteredArrayDataBooks?.length || '0'}</S.Counter>
            <S.Text>books</S.Text>
          </S.Text>
          <S.Content>
            {filteredCollectionBooks?.slice(0, visible).map((element: BookItem) => (
              <Link to={`${element.id}`} key={element.id}>
                <Item
                  dataBook={element}
                  handleClick={() => handleIdBook(element.id)}
                />
              </Link>
            ))}
          </S.Content>
          {filteredCollectionBooks?.length && (
            <Button onClick={showMoreItems} buttonName="Show more" />
          )}
        </>
      )}
    </S.Container>
  );
};

export default Items;
