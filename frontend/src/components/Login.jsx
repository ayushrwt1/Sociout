/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
//import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logoWhite.png";
import jwt_decode from "jwt-decode";
import { AiOutlineLogout } from "react-icons/ai";
import { client } from "../client";
import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { userPro, addUser, removeUser} = useAuthStore();

  const createOrGetUser = (response , addUser) => {
    localStorage.setItem("user", JSON.stringify(response.credential));

    const { name, sub, picture } = jwt_decode(response.credential);

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
     addUser(user);
    
    client.createIfNotExists(user).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="250px" />
          </div>

          <div className="shadow-2xl">
                {userPro ? (
                  <div>
                    <button type="button" className=" flex bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={() => {
                       googleLogout();
                       removeUser();} }> 
                      <AiOutlineLogout color="red"  fontSize={21} className=""/>   Logout User
                    </button>
                  </div>
                ):(<GoogleLogin
                    onSuccess={(response) => createOrGetUser(response, addUser)}
                    onError={() => {
                    console.log('Login Failed');
                }}/>
                )}
                
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
