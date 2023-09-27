import { Route, Routes } from 'react-router-dom';
import { bookId } from 'store/selectors';
import { useAppSelector } from 'hooks';
import DescriptionPage from 'pages/descriptionPage';
import Main from 'pages/main';

const AppRouter = () => {
  const url = useAppSelector(bookId);

  return (
    <Routes>
      <Route path="/*" element={<Main />} />
      {/* <Route path={`${url}`} element={<DescriptionPage />} /> */}
    </Routes>
  );
};

export default AppRouter;
