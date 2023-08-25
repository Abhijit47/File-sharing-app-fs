import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='justify-content-center p-3'>
        <MDBCol lg={6} md={12} sm={12} className='col-12'>
          <Error />
        </MDBCol>
      </MDBRow>
      <MDBContainer className='hstack justify-content-center'>
        <MDBBtn
          tag={'button'}
          color='dark'
          outline
          rippleCentered
          rippleRadius={'5'}
          rippleDuration={300}
          rounded
          onClick={handleGoBack}>
          Go back
        </MDBBtn>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ErrorPage;
