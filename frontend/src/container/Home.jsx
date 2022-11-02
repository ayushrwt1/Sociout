import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
//import { userQuery } from '../utils/data';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import Pins from './Pins';
import useAuthStore from "../store/authStore";
//import { client } from '../client';
import logo from '../assets/logoBlack.png';
//import { fetchUser } from '../utils/fetchUser';

const Home = () => {
  const { userPro } = useAuthStore();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  //const [user, setUser] = useState(null)
  const scrollRef = useRef(null);

  //const userInfo = fetchUser();

  // useEffect(() => {
  //   const query = userQuery(userPro?.sub);

  //   client.fetch(query).then((data) =>{
  //     setUser(data[0]);
  //   })
  // }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0,0)
  }, []);

  return (
    <div className=" flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out"> 
      <div className="hidden md:flex h-screen flex-initial"> 
        <Sidebar user={userPro && userPro} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className=" p-2 w-full flex flex-row justify-between items-center shadow-md">
        <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
        <Link to="/">
          <img src={logo} alt="logo" className="w-28" />
        </Link>
        <Link to={`user-profile/${userPro?._id}`}>
          <img src={userPro?.image} alt="logo" className="w-10 h-10 rounded-full" />
        </Link>
        </div>
      {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className=" absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
          </div>
          <Sidebar user={userPro && userPro} closeToggle = {setToggleSidebar}/>
        </div>
      )}
      </div>
      <div className=" pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
        <Route path="/user-profile/:userId" element={<UserProfile />}/>
        <Route path="/*" element={<Pins user={userPro && userPro} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default Home