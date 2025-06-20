import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()

// This context will be used to manage user data across the application. All the user data will be stored 
// here and can be accessed from any component that is wrapped in this context provider.


const UserContext = ({children}) => {

    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })

  return (

    <div>
      <UserDataContext.Provider value={[user, setUser]}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
