import { FC, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from 'AppRouter';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getSearchingBooks } from 'store/reducer/getSearchBooks';
import * as S from '../src/App.styles';

const App: FC = (): JSX.Element => {
const loading = useAppSelector(state=>state.books.loading)
console.log('load', loading)

  return (
    <HashRouter>
      <S.Container>
        <AppRouter />
      </S.Container>
    </HashRouter>
  );
};

export default App;
