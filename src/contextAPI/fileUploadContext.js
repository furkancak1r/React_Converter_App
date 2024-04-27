import React, { createContext, useState, useContext } from 'react';

const FileUploadContext = createContext();

export const useFileUpload = () => useContext(FileUploadContext);

export const FileUploadProvider = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState(null); // State'i ve setter'ı oluşturduk

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file); // State'i güncelleyen setter fonksiyonunu kullandık
    }
  };

  return (
    <FileUploadContext.Provider value={{ uploadedFile, setUploadedFile, handleFileChange }}>
      {children}
    </FileUploadContext.Provider>
  );
};
