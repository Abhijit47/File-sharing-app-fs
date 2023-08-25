import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import AllFiles from './pages/AllFiles';
import FileDownload from './pages/FileDownload';
import FileUpload from './pages/FileUpload';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<FileUpload />} />
        <Route path='/file/:id' element={<FileDownload />} />
        <Route path='/files/' element={<AllFiles />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
