import React from 'react';
import './home.css';
import ConversionTypes from '../conversionTypes/conversionTypes';
import UserUpload from '../userUpload/userUpload';

export default function Home() {
  return (
    <div className="container mt-5">
      <img src="logo_whitesmokebg.png" alt="Logo" id='logo' />

      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center main-title">Welcome to AI Converter Pro</h1>
          <p className="text-center description">Discover the simplicity of converting files with our intuitive tools.</p>
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <ConversionTypes />
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <UserUpload />
          <p className="text-center upload-instruction">Upload from button or drag and drop files here.</p>
        </div>
      </div>
    </div>
  );
}
