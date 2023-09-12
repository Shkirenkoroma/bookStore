import { useAppSelector } from 'hooks';
import DescriptionPage from 'pages/descriptionPage';
import Main from 'pages/main';
import { Route, Routes } from 'react-router-dom';
import { urlBookId } from 'store/selectors';

const AppRouter = () => {
  const url = useAppSelector(urlBookId);

  return (
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path={`${url}`} element={<DescriptionPage />} />
    </Routes>
  );
};

export default AppRouter