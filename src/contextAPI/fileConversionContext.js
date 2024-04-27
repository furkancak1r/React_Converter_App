import React, { createContext, useState, useContext } from 'react';

const FileConversionContext = createContext();

export const useFileConversion = () => useContext(FileConversionContext);

export const FileConversionProvider = ({ children }) => {
  const [conversions, setConversions] = useState({
    current: { from: 'JPEG', to: 'PNG' },
    options: [
      { from: 'JPEG', to: 'PNG', swapEnabled: true, multipleAllowed: false },
      { from: 'PNG', to: 'JPEG', swapEnabled: true, multipleAllowed: false },
      { from: 'JPEG', to: 'PDF', swapEnabled: false, multipleAllowed: true },

      // Add more conversion types here.
    ]
  });

  const swapConversion = () => {
    setConversions(prevConversions => {
      // Mevcut 'from' ve 'to' değerlerinin tersini bul
      const inverseIndex = prevConversions.options.findIndex(option =>
        option.from === prevConversions.current.to &&
        option.to === prevConversions.current.from
      );
  
      // Eğer tersi varsa swap yap, yoksa mevcut dönüşümü koru
      if (inverseIndex !== -1) {
        return {
          ...prevConversions,
          current: prevConversions.options[inverseIndex]
        };
      }
      return prevConversions;
    });
  };
  
  

  const setConversion = (selectedConversion) => {
    setConversions(prevConversions => ({
      ...prevConversions,
      current: selectedConversion
    }));
  };

  return (
    <FileConversionContext.Provider value={{ conversions, swapConversion, setConversion }}>
      {children}
    </FileConversionContext.Provider>
  );
};
