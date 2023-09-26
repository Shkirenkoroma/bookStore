import { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from 'AppRouter';
import * as S from '../src/App.styles';

const App: FC = (): JSX.Element => {

  return (
    <HashRouter>
      <S.Container>
        <AppRouter />
      </S.Container>
    </HashRouter>
  );
};

export default App;
