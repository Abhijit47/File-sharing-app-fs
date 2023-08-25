import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import download from 'js-file-download';
import {
  MDBBtn,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBSpinner,
  MDBTypography,
} from 'mdb-react-ui-kit';
import toast from 'react-hot-toast';

const FileDownload = () => {
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  let passwordRef = useRef('');

  const navigate = useNavigate();
  let { id } = useParams();

  const API_URL = `${process.env.REACT_APP_FILE_GET_ONE_URL}/${id}`;
  useEffect(() => {
    try {
      const getFile = async () => {
        setIsLoading(true);
        const res = await axios.get(API_URL);
        // console.log(res);
        setFileName(res.data.file.originalName);
        toast.success('success', {
          duration: 4000,
          position: 'top-center',
          className: 'bg-success text-light',
        });
        setIsLoading(false);
      };
      getFile();
    } catch (err) {
      // console.log(err);
      toast.error('Something went wrong', {
        duration: 4000,
        position: 'top-left',
        className: 'bg-warning text-light',
      });
    }
  }, [API_URL]);

  const handleCheck = () => {
    if (isChecked === false) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();

    const formData = {
      password: passwordRef.current.value,
    };

    const url = `${process.env.REACT_APP_FILE_DOWNLOAD_URL}/${id}`;

    const headers = {
      responseType: 'blob',
    };

    try {
      const response = await axios.all([
        axios.get(url, headers),
        axios.post(url, formData),
      ]);
      // console.log(response);
      toast.success('Success', {
        duration: 4000,
        position: 'top-right',
        className: 'bg-success text-light',
      });
      download(response[0].data, fileName);
      passwordRef.current.value = '';
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: 'bottom-center',
        className: 'bg-warning text-light',
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <MDBContainer className='mt-5 text-center'>
          <MDBSpinner role='status' color='primary'>
            <span className='visually-hidden'>Loading...</span>
          </MDBSpinner>
        </MDBContainer>
      ) : (
        <MDBContainer className='my-5'>
          <MDBTypography variant='h3' className='text-center'>
            Download Your file...
          </MDBTypography>

          {/* <form method='post'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                ref={passwordRef}
              />
              <MDBBtn
                color='light'
                rippleColor='primary'
                type='submit'
                onClick={handleDownload}>
                Download
              </MDBBtn>
            </form> */}

          <MDBContainer className='p-3 my-5 d-flex flex-column'>
            <MDBRow className='gx-0 justify-content-center'>
              <MDBCol lg={6} md={8} sm={11} className='col-12'>
                <form
                  method='post'
                  className='p-5 bg-light shadow-3-strong rounded-3 border border-success'>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Password'
                    type='password'
                    name='password'
                    id='password'
                    ref={passwordRef}
                  />

                  <div className='d-flex justify-content-between mx-3 mb-4'>
                    <MDBCheckbox
                      name='checkbox'
                      value=''
                      defaultChecked={isChecked}
                      id='checkbox'
                      label='Agree with terms and conditions*'
                      onClick={handleCheck}
                    />
                  </div>

                  <MDBContainer className='gx-0 hstack gap-3'>
                    {isChecked ? (
                      <MDBBtn
                        className='mb-4'
                        color='primary'
                        rippleColor='dark'
                        type='submit'
                        onClick={handleDownload}>
                        Download
                      </MDBBtn>
                    ) : (
                      <MDBBtn
                        className='mb-4'
                        color='primary'
                        rippleColor='dark'
                        type='submit'
                        disabled
                        onClick={handleDownload}>
                        Download
                      </MDBBtn>
                    )}
                    {/* <MDBBtn
                      className='mb-4'
                      color='primary'
                      rippleColor='dark'
                      type='submit'
                      onClick={handleDownload}>
                      Download
                    </MDBBtn> */}

                    <MDBBtn
                      className='mb-4'
                      color='danger'
                      rippleColor='light'
                      type='submit'
                      onClick={() => navigate('/files')}>
                      Go back
                    </MDBBtn>
                  </MDBContainer>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      )}
    </>
  );
};

export default FileDownload;
