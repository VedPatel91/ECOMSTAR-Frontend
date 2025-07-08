// src/context/UserContext.js
import React, { createContext, useState } from 'react';

// 1. Create context
export const UserContext = createContext();

// 2. Create provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
