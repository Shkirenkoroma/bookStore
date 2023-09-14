import { FC, ChangeEvent, useState, KeyboardEvent } from 'react';
import { Button } from 'components/button';
import Input from 'components/input';
import Select from 'components/select';
import { kindSortingName } from 'assets/constants';
import { getSearchingBooks } from 'store/reducer/getSearchBooks';
import { useAppDispatch } from 'hooks';
import Items from './items';
import * as S from './index.styles';

const Main: FC = (): JSX.Element => {
  const [inputString, setInputString] = useState<string>('');
  const [sortingField, setSortingField] = useState<string>('');
  const dispatch = useAppDispatch();

  const triggerLoadData = (): void => {
    dispatch(getSearchingBooks(inputString));
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
    }
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    const querySortingParams = `${inputString}&orderBy=${e.target.value}`;
    dispatch(getSearchingBooks(querySortingParams));
  };

  return (
    <S.Main>
      <S.Header>
        <S.HeaderMain>
          <Input onChange={handleChange} onKeyDown={handleKeyPress} />
          <Button onClick={triggerLoadData} buttonName={'Search'} />
        </S.HeaderMain>
        <S.ButtonGroup>
          {kindSortingName.map(({ className, name, id }) => (
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
      <Items  sortingField={sortingField} />
    </S.Main>
  );
};

export default Main;
