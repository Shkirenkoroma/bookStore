import DescriptionPage from 'pages/descriptionPage';
import Main from 'pages/main';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { urlBookId } from 'store/selectors';

const AppRouter = () => {
  const url = useSelector(urlBookId);

  return (
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path={`${url}`} element={<DescriptionPage />} />
    </Routes>
  );
};

export default AppRouter