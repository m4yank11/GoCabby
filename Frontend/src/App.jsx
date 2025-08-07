import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import UserLogin from './pages/UserLogin.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import UserHome from './pages/UserHome.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element={<Start/>}/>
        <Route path = '/UserSignUp' element= {<UserSignUp/>}/>
        <Route path = '/UserLogin' element= {<UserLogin/>}/>
        <Route path = '/Riding' element= {<Riding/>}/>
        <Route path = '/CaptainSignUp' element= {<CaptainSignUp/>}/>
        <Route path = '/CaptainLogin' element= {<CaptainLogin/>}/> 
        <Route path = '/CaptainRiding' element= {<CaptainRiding/>}/>


        <Route path = '/UserHome' element = {
          <UserProtectedWrapper>
            <UserHome/>
          </UserProtectedWrapper>}
        />

        <Route path = '/User/Logout' element={<UserProtectedWrapper>
          <UserLogout/>
        </UserProtectedWrapper>}
        />

        <Route path = '/CaptainHome' element = {
          <CaptainProtectedWrapper>
            <CaptainHome/>
          </CaptainProtectedWrapper>}
        />

        <Route path = '/Captain/Logout' element = {<CaptainProtectedWrapper>
          <CaptainLogout/>      
        </CaptainProtectedWrapper>}
        />

      </Routes>
      
    </div>
  )
}

export default App

