import React, { createContext, useState, useContext } from 'react';

const FileConversionContext = createContext();

export const useFileConversion = () => useContext(FileConversionContext);

export const FileConversionProvider = ({ children }) => {
  const initialOptions = [
    { from: 'JPEG', to: 'PNG', swapEnabled: true },
    { from: 'PNG', to: 'JPEG', swapEnabled: true },
    { from: 'JPEG', to: 'PDF', swapEnabled: false },
    // Add more conversion types here.
  ];

  const uniqueFromTypes = Array.from(new Set(initialOptions.map(option => option.from)));

  const [conversions, setConversions] = useState({
    current: { from: 'JPEG', to: 'PNG' },
    options: initialOptions,
    fromTypes: uniqueFromTypes,
    toOptions: initialOptions.filter(option => option.from === 'JPEG')
  });

  const swapConversion = () => {
    setConversions(prevConversions => {
      // Find the inverse conversion where the current "to" becomes "from" and "from" becomes "to"
      const inverseOption = prevConversions.options.find(option =>
        option.from === prevConversions.current.to &&
        option.to === prevConversions.current.from
      );
  
      if (!inverseOption) {
        console.error("No inverse conversion found.");
        return prevConversions; // Return previous state if no inverse is found
      }
  
      return {
        ...prevConversions,
        current: inverseOption,
        toOptions: prevConversions.options.filter(option => option.from === inverseOption.from)
      };
    });
  };
  

  const setConversion = (from, to) => {
    setConversions(prevConversions => ({
      ...prevConversions,
      current: { from, to },
      toOptions: prevConversions.options.filter(option => option.from === from)
    }));
  };

  return (
    <FileConversionContext.Provider value={{ conversions, swapConversion, setConversion }}>
      {children}
    </FileConversionContext.Provider>
  );
};