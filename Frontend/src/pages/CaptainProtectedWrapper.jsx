import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectedWrapper = ({
    children
}) => {
    // const {user} = useContext({UserDataContext})
    // we will not rely on user here to determine if the user is logged in or not, what if the user logs in and then refreshes the page?
    // therefore we will use token based authentication
    // we will check if the token is present in local storage, if it is then we will allow the user to access the page
    // if it is not present then we will redirect the user to the login page
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    // we have to check whether the user is logged in, we will allow the user to access the page only if he is logged in
    useEffect(() => {
        if(!token){
            navigate('/CaptainLogin')
        }
    }, [token])

  
    return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectedWrapper
