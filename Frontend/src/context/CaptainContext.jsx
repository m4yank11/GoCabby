import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext()

// This context will be used to manage captain data across the application. All the captain data will be stored 
// here and can be accessed from any component that is wrapped in this context provider.


const CaptainContext = ({children}) => {

    const [captain, setCaptain] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        },
        vehicle: {
            color: '',
            plate: '',
            type: ''
        }
    })

  return (

    <div>
      <CaptainDataContext.Provider value = {[captain, setCaptain]}>
        {children}
      </CaptainDataContext.Provider> 
    </div>
  )
}

export default CaptainContext
