import { FC, ChangeEvent, useState, KeyboardEvent } from 'react';
import { Button } from 'components/button';
import Input from 'components/input';
import Select from 'components/select';
import { kindCategory } from 'assets/constants';
import { getSearchingBooks } from 'store/reducer/getSearchBooks';
import { useAppDispatch, useAppSelector } from 'hooks';
import { sortBook } from 'store/reducer/sortBooks';
import { getSearchingString } from 'store/reducer';
import { descriptionSearchParams } from 'store/selectors'
import Items from './items';
import * as S from './index.styles';

const Main: FC = (): JSX.Element => {
  const [inputString, setInputString] = useState<string>('');
  const [sortingField, setSortingField] = useState<string>('');
  const [selectOrder, setSelectOrder] = useState<string>('');
  const dispatch = useAppDispatch();
  const searchingParams = useAppSelector(descriptionSearchParams)

  const triggerLoadData = (): void => {
    dispatch(getSearchingBooks(inputString));
    dispatch(getSearchingString(inputString))
  };

  const triggerSortByKind = (name: string): void => {
    setSortingField(name);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputString(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      dispatch(getSearchingBooks(inputString));
      dispatch(getSearchingString(inputString))
    }
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectOrder(e.target.value)
    const querySortingParams = `${searchingParams}&orderBy=${e.target.value}`;
    dispatch(sortBook(querySortingParams));
  };

  return (
    <S.Main>
      <S.Header>
        <S.HeaderMain>
          <Input onChange={handleChange} onKeyDown={handleKeyPress} />
          <Button onClick={triggerLoadData} buttonName={'Search'} />
        </S.HeaderMain>
        <S.ButtonGroup>
          {kindCategory.map(({ className, name, id }) => (
            <Button
              key={id}
              className={className}
              onClick={() => triggerSortByKind(name)}
              buttonName={name}
            />
          ))}
        </S.ButtonGroup>
        <Select onChange={handleChangeSelect} />
      </S.Header>
      <Items  sortingField={sortingField} selectOrder={selectOrder} />
    </S.Main>
  );
};

export default Main;
