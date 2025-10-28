// LanguageContext.js
import React, { createContext, useState } from 'react';

const LanguageContext = createContext("en"); // default: English

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };