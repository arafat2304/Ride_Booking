import React, { useContext } from 'react';
import Start from './pages/Start';
import Home from './pages/Home';
import CaptainLogin from "./pages/CaptainLogin"
import { Route,Routes } from 'react-router-dom';
import CaptainSignup from './pages/CaptainSignup';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserProtecterWrapper from './pages/USerProtecterWrapper';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectionWeapper from './pages/CaptainProtectionWrapper';
import CaptainLogout from "./pages/CaptainLogout";
import Riding from './components/Riding';
import CaptainRiding from './pages/CaptainRiding';


const App = () => {

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={
          <UserProtecterWrapper>
            <Home />
            </UserProtecterWrapper>
        } />
        <Route path="/login" element={<UserLogin/>}/>
        <Route path='/captain-riding' element={<CaptainRiding/>}/>
        <Route path="/riding" element={<Riding/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path='/user/logout' element={
          <UserProtecterWrapper>
            <UserLogout/>
          </UserProtecterWrapper>
        }/>
        <Route path='/captain-home' element={
          <CaptainProtectionWeapper>
            <CaptainHome/>
          </CaptainProtectionWeapper>
        }/>
        <Route path='/captain-logout' element={<CaptainLogout/>}/>
      </Routes>
     
    </div>
  );
}

export default App;