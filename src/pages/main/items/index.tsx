import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Button } from 'components/button';
import { isLoading, urlBookId } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectSearchingBook } from 'store/reducer/selectSearchingBook';
import Item, { IVolumeInfo } from './item';
import * as S from './index.styles';

export interface IPropsItems {
  kind: string;
  id: number;
  etag: string;
  selfLink: string;
  volumeInfo: IVolumeInfo;
}

export interface IStateItemsProps {
  sortingField: string;
}

export interface IPropertiesMap {
  volumeInfo: IVolumeInfo;
}

const Items: FC<IStateItemsProps> = ({ sortingField }): JSX.Element => {
  const [stateArray, setStateArray] = useState<any>([]);
  const [filteredArray, setFilteredArray] = useState<any>([]);
  const [visible, setVisible] = useState<number>(30);
  const dispatch = useAppDispatch();
  const dataFromState = useAppSelector(state => state.books.books.items);
  const loading = useAppSelector(isLoading);
  console.log('filteredArray', filteredArray);
  console.log('dataFromState', dataFromState);
  const id = useAppSelector(urlBookId);

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 30);
  };

  useEffect(() => {
    setStateArray(dataFromState);
    setFilteredArray(dataFromState);
  }, [dataFromState]);

  useEffect(() => {
    console.log('oops')
    //dispatch((selectSearchingBook(id)));
  }, [id]);

  useEffect(() => {
    if (sortingField === 'All') {
      setFilteredArray(dataFromState);
    } else setFilteredArray(sortingFunction());
  }, [sortingField]);

  const sortingFunction = () => {
    return stateArray?.filter((element: IPropertiesMap) => {
      const sortingElement = element.volumeInfo.categories?.[0];
      console.log('saf', sortingElement)
      const isHasMatches = sortingElement?.includes(sortingField);
      return isHasMatches;
    });
  };

  const handleIdBook = (id: number): void => {
    console.log('id in function', id);
    dispatch(selectSearchingBook(id));
  };

  return (
    <S.Container>
      {loading ? (
        <MagnifyingGlass
          visible={true}
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
            Found<S.Counter>{filteredArray.length}</S.Counter>
            <S.Text>books</S.Text>
          </S.Text>
          <S.Content>
            {filteredArray?.slice(0, visible).map((element: IPropsItems) => (
              <Link to={`${element.id}`} key={element.id}>
                <Item
                  state={element}
                  handleClick={() => handleIdBook(element.id)}
                />
              </Link>
            ))}
          </S.Content>
          {!!filteredArray?.length && <Button onClick={showMoreItems} buttonName={'Show more'} />}
         
        </>
      )}
    </S.Container>
  );
};

export default Items;
