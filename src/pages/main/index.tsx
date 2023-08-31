import { FC, ChangeEvent, useState, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, getSortingBooks } from 'redux/reducer';
import { Button } from 'components/button';
import Input from 'components/input';
import Select from 'components/select';
import { kindSortingName } from 'assets/constants';
import Items from './items';
import * as S from './index.styles';

const Main: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [inputString, setInputString] = useState<string>('');
  const [sortingField, setSortingField] = useState<string>('');
 
  const triggerLoadData = (): void => {
    dispatch(getBooks(inputString));
  };

  const triggerSortByKind = (name: string): void => {
    setSortingField(name);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputString(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      dispatch(getBooks(inputString));
    }
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    const queryParams = `${inputString}&orderBy=${e.target.value}`;
    dispatch(getSortingBooks(queryParams));
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
