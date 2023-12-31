import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Button } from 'components/button';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getBooks } from 'store/reducer/getBooks';
import { dataBook, searchingQueryParams, imageSource, loadingDataCollectionBooks } from 'store/selectors';
import * as S from './index.styles';

const DescriptionPage = () => {
  const loading = useAppSelector(loadingDataCollectionBooks);
  const {
    title, categories, authors, description,
  } = useAppSelector(dataBook);
  const dispatch = useAppDispatch();
  const titlePoster = useAppSelector(imageSource);
  const searchParams = useAppSelector(searchingQueryParams);
  const navigate = useNavigate();

  const goBack = () => {
    dispatch(getBooks(searchParams));
    navigate(-1);
  };

  return (
    <S.Container>
      {loading ? (
        <MagnifyingGlass
          visible={true}
          height="110"
          width="110"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{ marginTop: '10px' }}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#bb7d81"
        />
      ) : (
        <>
          <Button
            buttonName="Back"
            className="backbutton"
            onClick={goBack}
          />
          <S.Label>
            <S.Image src={titlePoster} alt="label of book" /> 
          </S.Label>
          <S.Description>
            <S.Page>
              <S.Text>Name:</S.Text>
              <S.TextDescription>{title}</S.TextDescription>
            </S.Page>
            <S.Page>
              <S.Text>Categories: </S.Text>
              <S.TextDescription>{categories}</S.TextDescription>
            </S.Page>
            <S.Page>
              <S.Text>Authors:</S.Text>
              <S.TextDescription>{authors}</S.TextDescription>
            </S.Page>
            <S.Page>
              <S.Text>Description:</S.Text>
              <S.TextDescription>{description}</S.TextDescription>
            </S.Page>
          </S.Description>
        </>
      )}
    </S.Container>
  );
};

export default DescriptionPage;
