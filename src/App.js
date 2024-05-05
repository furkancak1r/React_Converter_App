import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home/home';
import { FileConversionProvider } from './contextAPI/fileConversionContext';
import { FileUploadProvider } from './contextAPI/fileUploadContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <FileConversionProvider>
        <FileUploadProvider>
          <Home />
        </FileUploadProvider>
      </FileConversionProvider>
      <ToastContainer /> 
    </div>
  );
}

export default App;
