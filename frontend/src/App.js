/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Home from './container/Home';
import useAuthStore from './store/authStore';
const App = () => {
  const navigate = useNavigate();
  const { userPro } = useAuthStore();

  useEffect(() => {
    if(!userPro) navigate('/login');
  }, [])
  
  return (
    <Routes>
      <Route path='login' element={<GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}><Login /></GoogleOAuthProvider>} />
      <Route path='/*' element={<Home />} />
    </Routes>
  )
}

export default App;