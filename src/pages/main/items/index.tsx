import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import { isLoading, urlBookId, state } from 'redux/selectors';
import { getBooks, getIdBook } from 'redux/reducer';
import { Button } from 'components/button';
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
  const [stateArray, setStateArray] = useState<IPropsItems[]>([]);
  const [filteredArray, setFilteredArray] = useState<IPropsItems[]>([]);
  const [visible, setVisible] = useState<number>(30);
  const dispatch = useDispatch();
  const dataFromState = useSelector(state);
  const loading = useSelector(isLoading);
  const id = useSelector(urlBookId);
  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 30);
  };

  useEffect(() => {
    setStateArray(dataFromState);
    setFilteredArray(dataFromState);
  }, [dataFromState]);

  useEffect(() => {
    dispatch(getBooks(id));
  }, [id]);

  useEffect(() => {
    if (sortingField === 'All') {
      setFilteredArray(dataFromState);
    } else setFilteredArray(sortingFunction());
  }, [sortingField]);

  const sortingFunction = () => {
    return stateArray?.filter((element: IPropertiesMap) => {
      const sortingElement = element.volumeInfo.categories?.[0];
      const isHasMatches = sortingElement?.includes(sortingField);
      return isHasMatches;
    });
  };
  const handleIdBook = (id: number): void => {
    dispatch(getIdBook(id));
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
      ) : filteredArray ? (
        <>
          {filteredArray.length > 0 ? (
            <>
              <S.Text>
                Found<S.Counter>{filteredArray.length}</S.Counter>
                <S.Text>books</S.Text>
              </S.Text>
            </>
          ) : null}
          <S.Content>
            {filteredArray.slice(0, visible).map((element: IPropsItems) => (
              <Link to={`${element.id}`} key={element.id}>
                <Item
                  state={element}
                  handleClick={() => handleIdBook(element.id)}
                />
              </Link>
            ))}
          </S.Content>
          {filteredArray.length > 30 && dataFromState.length > visible ? (
            <Button onClick={showMoreItems} buttonName={'Show more'} />
          ) : null}
        </>
      ) : null}
    </S.Container>
  );
};

export default Items;
