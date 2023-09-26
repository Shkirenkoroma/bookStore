import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Button } from 'components/button';
import { isLoading } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectBook } from 'store/reducer/selectBook';
import Item, { IVolumeInfo } from './item';
import * as S from './index.styles';

export interface IPropsItems {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: IVolumeInfo;
}

export interface IStateItemsProps {
  selectCategory: string;
  selectOrder: string;
}

export interface IPropertiesMap {
  volumeInfo: IVolumeInfo;
}

const Items: FC<IStateItemsProps> = ({ selectCategory, selectOrder }): JSX.Element => {
  const [arrayDataBooks, setArrayDataBooks] = useState<any>([]);
  const [filteredArrayDataBooks, setFilteredArrayDataBooks] = useState<any>([]);
  const [visible, setVisible] = useState<number>(30);
  const dispatch = useAppDispatch();
  const collectionBooks = useAppSelector(state => state?.books?.books?.items);
  const filteredCollectionBooks = useAppSelector(state => state?.books?.filteredbook?.items);
  const loadingCollectionBooks = useAppSelector(isLoading);

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
    return arrayDataBooks?.filter((element: IPropertiesMap) => {
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
            {filteredArrayDataBooks?.slice(0, visible).map((element: IPropsItems) => (
              <Link to={`${element.id}`} key={element.id}>
                <Item
                  dataBook={element}
                  handleClick={() => handleIdBook(element.id)}
                />
              </Link>
            ))}
          </S.Content>
          {!!filteredArrayDataBooks?.length && (
            <Button onClick={showMoreItems} buttonName="Show more" />
          )}
        </>
      )}
    </S.Container>
  );
};

export default Items;
