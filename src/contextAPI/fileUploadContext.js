import React, { createContext, useState, useContext } from 'react';

const FileUploadContext = createContext();

export const useFileUpload = () => useContext(FileUploadContext);

export const FileUploadProvider = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]); // Initialize state as an array

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    if (files.length) {
      setUploadedFiles(files); // Set the array of files
    }
  };

  return (
    <FileUploadContext.Provider value={{ uploadedFiles, setUploadedFiles, handleFileChange }}>
      {children}
    </FileUploadContext.Provider>
  );
};
