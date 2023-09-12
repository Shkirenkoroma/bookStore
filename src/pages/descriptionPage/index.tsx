import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Button } from 'components/button';
import { useAppSelector } from 'hooks';
import { bookData, imageLinks, isLoading } from 'store/selectors';
import * as S from './index.styles';

const DescriptionPage = () => {
  const loading = useAppSelector(isLoading);
  const {
    title, categories, authors, description,
  } = useAppSelector(bookData);
  const label = useAppSelector(imageLinks);
  const navigate = useNavigate();

  const goBack = () => {
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
            buttonName={'Back'}
            className={'backbutton'}
            onClick={goBack}
          />
          <S.Label>
            <S.Image src={label} alt="label of book" />
          </S.Label>
          <S.Description>
            <S.Page>
              <S.Text>Name:</S.Text>
              <S.Text>{title}</S.Text>
            </S.Page>
            <S.Page>
              <S.Text>Categories: </S.Text>
              <S.Text>{categories}</S.Text>
            </S.Page>
            <S.Page>
              <S.Text>Authors:</S.Text>
              <S.Text>{authors}</S.Text>
            </S.Page>
            <S.Page>
              <S.Text>Description:</S.Text>
              <S.Text>{description}</S.Text>
            </S.Page>
          </S.Description>
        </>
      )}
    </S.Container>
  );
};

export default DescriptionPage;
