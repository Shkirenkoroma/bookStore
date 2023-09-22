import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Button } from 'components/button';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getSearchingBooks } from 'store/reducer/getSearchBooks';
import { bookData, descriptionSearchParams, imageLinks, isLoading } from 'store/selectors';
import * as S from './index.styles';

const DescriptionPage = () => {
  const loading = useAppSelector(isLoading);
  const {
    title, categories, authors, description,
  } = useAppSelector(bookData);
  const dispatch = useAppDispatch()
  const label = useAppSelector(imageLinks);
  const searchParams = useAppSelector(descriptionSearchParams)
  const navigate = useNavigate();

  const goBack = () => {
    dispatch(getSearchingBooks(searchParams))
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
            <S.Image src={label} alt="label of book" /> 
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
