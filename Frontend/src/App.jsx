import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import UserSignUp from './pages/userSignUp.jsx'
import UserLogin from './pages/userLogin.jsx'
import CaptainSignUp from './pages/captainSignUp.jsx'
import CaptainLogin from './pages/captainLogin.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/userSignUp' element= {<UserSignUp/>}/>
        <Route path = '/userLogin' element= {<UserLogin/>}/>
        <Route path = '/captainSignUp' element= {<CaptainSignUp/>}/>
        <Route path = '/captainLogin' element= {<CaptainLogin/>}/> 
      </Routes>
      
    </div>
  )
}

export default App

