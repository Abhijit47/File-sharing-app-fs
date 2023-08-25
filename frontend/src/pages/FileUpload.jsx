import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBFile,
  MDBInput,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import toast from 'react-hot-toast';

const FileUpload = () => {
  // const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const maxSize = 2 * 1024 * 1024;

  const saveFile = (e) => {
    if (e.target.files[0].size >= maxSize) {
      return toast.error('File size is too large. Allowed only 2MB.', {
        duration: 4000,
        position: 'top-center',
      });
    }
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const headers = {
      'Content-Type': 'multipart/form-data',
      // 'Access-Control-Allow-Origin': '*',
      // 'content-length': `${file.size}`,
    };

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);
      formData.append('password', password);
      const res = await axios.post(
        `${process.env.REACT_APP_FILE_UPLOAD_URL}`,
        formData,
        password,
        headers
      );
      // console.log(res);
      toast.success(res.data.message, {
        duration: 4000,
        position: 'bottom-center',
        className: 'bg-success text-light',
      });
      navigate('/files');
    } catch (err) {
      toast.error(err.response.data.message, {
        duration: 5000,
        position: 'bottom-left',
        className: 'bg-warning text-light',
      });
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit} method='post' encType='multipart/form-data'>
        <label htmlFor='file'>File:</label>
        <input type='file' name='file' id='file' required onChange={saveFile} />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={handleChange}
        />
        <button type='submit'>Share</button>
      </form> */}
      <MDBContainer fluid className='mt-4'>
        <MDBRow className='justify-content-center p-3'>
          <MDBCol lg={6}>
            <form
              onSubmit={handleUpload}
              method='post'
              encType='multipart/form-data'>
              <MDBCard className='border border-1 border-primary shadow-3-strong'>
                <MDBCardBody>
                  <MDBTypography variant='h3' className='text-center'>
                    Share your files
                  </MDBTypography>
                  <hr className='mx-n3' />
                  <MDBRow className='align-items-center justify-content-center pt-4 pb-3 gap-lg-0 gap-md-3 gap-sm-3 gap-3'>
                    <MDBCol lg={3} md={3} sm={11} className='col-12'>
                      <h6 className='mb-0 text-center'>Upload file</h6>
                    </MDBCol>
                    <MDBCol lg={9} md={9} sm={11} className='col-12'>
                      <MDBFile
                        size='lg'
                        name='file'
                        id='file'
                        required
                        onChange={saveFile}
                      />
                      <div className='small text-muted mt-2'>
                        Upload your personal file or any other relevant file.
                        Max file size 2 MB
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <hr className='mx-n3' />
                  <MDBRow className='align-items-center justify-content-center pt-4 pb-3 gap-lg-0 gap-md-3 gap-sm-3 gap-3'>
                    <MDBCol lg={3} md={3} sm={11} className='col-12'>
                      <h6 className='mb-0 text-center'>Password</h6>
                    </MDBCol>

                    <MDBCol lg={9} md={9} sm={11} className='col-12'>
                      <MDBInput
                        label='Password'
                        size='lg'
                        id='password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr className='mx-n3' />

                  {!file && !fileName ? (
                    <MDBContainer className='hstack justify-content-center'>
                      <MDBBtn className='my-4' size='md' disabled>
                        Share
                      </MDBBtn>
                    </MDBContainer>
                  ) : (
                    <MDBContainer className='hstack justify-content-center'>
                      <MDBBtn className='my-4' size='md'>
                        Share
                      </MDBBtn>
                    </MDBContainer>
                  )}
                  <MDBContainer className='hstack justify-content-center'>
                    <Link to='/files' className='btn btn-dark'>
                      Goto files
                    </Link>
                  </MDBContainer>
                </MDBCardBody>
              </MDBCard>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default FileUpload;
