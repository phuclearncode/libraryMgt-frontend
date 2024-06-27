import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);



  return (
    <BookContext.Provider
      value={{
        books
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
