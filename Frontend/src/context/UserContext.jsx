import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()

// This context will be used to manage user data across the application. All the user data will be stored 
// here and can b
// e accessed from any component that is wrapped in this context provider.


const UserContext = ({children}) => {

    const [user, setUser] = useState(null);
  // Add a loading state for better UI feedback
  const [isLoading, setIsLoading] = useState(true);

  // Provide the context value as an object
  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;

