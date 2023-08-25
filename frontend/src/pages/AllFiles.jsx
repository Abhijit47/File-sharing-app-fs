import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardSubTitle,
  MDBBadge,
  MDBTypography,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AllFiles = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = `${process.env.REACT_APP_FILE_GET_ALL_URL}`;

  useEffect(() => {
    try {
      const getFiles = async () => {
        setIsLoading(true);
        const res = await axios.get(API_URL);
        // console.log(res);
        setData(res.data.files);
        toast.success('Success', {
          duration: 4000,
          position: 'bottom-right',
          className: 'bg-success text-light',
        });
        setIsLoading(false);
      };
      getFiles();
    } catch (error) {
      toast.error('Something happend...', {
        duration: 4000,
        position: 'bottom-left',
        className: 'bg-warning text-light',
      });
    }
  }, [API_URL]);

  return (
    <>
      <MDBContainer fluid className='gx-0 p-1 mt-5'>
        <MDBTypography variant='h1' className='text-center'>
          All files
          <span>
            <i className='fa-solid fa-file ms-2'></i>
          </span>
        </MDBTypography>
        {isLoading ? (
          <MDBContainer className='mt-5 text-center'>
            <MDBSpinner role='status' color='primary'>
              <span className='visually-hidden'>Loading...</span>
            </MDBSpinner>
          </MDBContainer>
        ) : (
          <MDBRow className='gx-0 mt-3 justify-content-around'>
            {data?.map((file, i) => {
              return (
                <MDBCol
                  lg={4}
                  md={6}
                  sm={11}
                  className='col-12 p-2'
                  key={i + 1}>
                  <MDBCard className='text-center shadow-3-strong m-auto'>
                    <MDBCardBody className='vstack align-items-center gap-3'>
                      <MDBCardTitle tag={'h6'}>
                        <MDBBadge color='primary' className='me-2'>
                          File name
                        </MDBBadge>
                        {file.originalName.length >= 17
                          ? `${file.originalName.substr(0, 15)}...`
                          : file.originalName}
                      </MDBCardTitle>
                      <MDBCardSubTitle>
                        <MDBBadge color='success' className='me-2'>
                          Downloads
                        </MDBBadge>
                        {file.downloadCount}
                      </MDBCardSubTitle>
                      <MDBCardText>
                        {new Date(file.created_At).toDateString()}
                      </MDBCardText>

                      <MDBBtn>
                        <Link to={`/file/${file._id}`} className='text-light'>
                          Download
                        </Link>
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              );
            })}
            <MDBContainer className='hstack justify-content-center mt-4'>
              <Link to='/' className='btn btn-primary'>
                upload new one
              </Link>
            </MDBContainer>
          </MDBRow>
        )}
      </MDBContainer>
    </>
  );
};

export default AllFiles;
