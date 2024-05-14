import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'; // Updated imports here
import 'bootstrap/dist/css/bootstrap.min.css';
// import bootstrap.js
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Home from './components/home/home';
import { PrivacyPolicy } from './components/privacyPolicy/privacyPolicy'; 
import {Faq} from './components/faq/faq';
import { FileConversionProvider } from './contextAPI/fileConversionContext';
import { FileUploadProvider } from './contextAPI/fileUploadContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoaderProvider } from './contextAPI/loaderContext';
import { LoadingSpinner } from './components/loader/loader';

function App() {
  return (
    <Router>
      <LoaderProvider>
        <div className="App">
          <FileConversionProvider>
            <FileUploadProvider>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/frequently-asked-questions" element={<Faq />} />
                <Route path="/" element={<Navigate replace to="/home" />} />
              </Routes>
            </FileUploadProvider>
          </FileConversionProvider>
          <ToastContainer />
          <LoadingSpinner />
        </div>
      </LoaderProvider>
    </Router>
  );
}

export default App;
