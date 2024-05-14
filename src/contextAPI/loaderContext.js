import React, { createContext, useContext, useState } from 'react';

// Creating the context
const LoaderContext = createContext();

// Custom hook to use the context
export const useLoader = () => useContext(LoaderContext);

// Provider component
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Function to start the loader
  const startLoading = () => setIsLoading(true);

  // Function to stop the loader
  const stopLoading = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};
