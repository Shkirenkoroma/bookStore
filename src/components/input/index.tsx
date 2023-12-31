import { FC, HTMLAttributes } from 'react';
import * as S from './index.styles';

const Input: FC<HTMLAttributes<HTMLInputElement>> = ({...rest}): JSX.Element => {
  return <S.Input type="text" placeholder="Введите название книги" {...rest} />;
};

export default Input;
