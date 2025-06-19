import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import UserLogin from './pages/UserLogin.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import Home from './pages/Home.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element={<Start/>}/>
        <Route path = '/UserSignUp' element= {<UserSignUp/>}/>
        <Route path = '/UserLogin' element= {<UserLogin/>}/>
        <Route path = '/CaptainSignUp' element= {<CaptainSignUp/>}/>
        <Route path = '/CaptainLogin' element= {<CaptainLogin/>}/> 
        <Route path = '/Home' element = {<Home/>}/>
      </Routes>
      
    </div>
  )
}

export default App

