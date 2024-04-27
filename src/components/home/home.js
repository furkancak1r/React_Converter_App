import React from 'react';
import './home.css';  // CSS dosyası için doğru yolu belirtiniz.
import ConversionTypes from '../conversionTypes/conversionTypes';
import UserUpload from '../userUpload/userUpload';
//setUploadedFiles is not a function TypeError: setUploadedFiles is not a function fileUploadContext.JS BİRDEN FAZLA DOSYA YÜKLEYİNCE VERİYOR BU HATAYI AYRICA 2 TANE JPEG VAR DÜZELT
export default function Home() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center">AI Converter Pro</h1>
          <p className="text-center">Explore our file conversion tools:</p>
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
        </div>
      </div>
    </div>
  );
}
