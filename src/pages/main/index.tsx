import { FC, ChangeEvent, useState, KeyboardEvent } from 'react';
import { Button } from 'components/button';
import Input from 'components/input';
import Select from 'components/select';
import { kindCategory } from 'assets/constants';
import { getBooks } from 'store/reducer/getBooks';
import { useAppDispatch, useAppSelector } from 'hooks';
import { sortBooks } from 'store/reducer/sortBooks';
import { getSearchingString } from 'store/reducer';
import { searchingQueryParams } from 'store/selectors';
import Items from './items';
import * as S from './index.styles';

const Main: FC = (): JSX.Element => {
  const [searchingWord, setSearchingWord] = useState<string>('');
  const [selectCategory, setSelectCategory] = useState<string>('');
  const [selectOrder, setSelectOrder] = useState<string>('');
  const dispatch = useAppDispatch();
  const searchingParams = useAppSelector(searchingQueryParams)

  const startLoadDataBooks = (): void => {
    dispatch(getBooks(searchingWord));
    dispatch(getSearchingString(searchingWord))
  };

  const selectKindCategory = (name: string): void => {
    setSelectCategory(name);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchingWord(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      dispatch(getBooks(searchingWord));
      dispatch(getSearchingString(searchingWord))
    }
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    const querySortingParams = `${searchingParams}&orderBy=${e.target.value}`;
    setSelectOrder(e.target.value)
    dispatch(sortBooks(querySortingParams));
  };

  return (
    <S.Main>
      <S.Header>
        <S.HeaderMain>
          <Input onChange={handleChange} onKeyDown={handleKeyPress} />
          <Button onClick={startLoadDataBooks} buttonName={'Search'} />
        </S.HeaderMain>
        <S.ButtonGroup>
          {kindCategory.map(({ className, name, id }) => (
            <Button
              key={id}
              className={className}
              onClick={() => selectKindCategory(name)}
              buttonName={name}
            />
          ))}
        </S.ButtonGroup>
        <Select onChange={handleChangeSelect} />
      </S.Header>
      <Items selectCategory={selectCategory} selectOrder={selectOrder} />
    </S.Main>
  );
};

export default Main;
