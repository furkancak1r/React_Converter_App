import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Önce bootstrap stilini yükleyin
import './App.css'; // Sonra kendi stilinizi yükleyin
import Home from './components/home/home';
import { FileConversionProvider } from './contextAPI/fileConversionContext';
import { FileUploadProvider } from './contextAPI/fileUploadContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Toastify stilini ekleyin

function App() {
  return (
    <div className="App">
      <FileConversionProvider>
        <FileUploadProvider>
          <Home />
        </FileUploadProvider>
      </FileConversionProvider>
      <ToastContainer /> {/* ToastContainer'ı en sona taşıdık */}
    </div>
  );
}

export default App;
