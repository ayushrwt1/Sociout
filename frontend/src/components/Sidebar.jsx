import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import useAuthStore from "../store/authStore";

import logo from "../assets/logoBlack.png";
import { categories } from "../utils/data";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";


const Sidebar = (user, closeToggle) => {
  const { userPro } = useAuthStore();
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className=" flex flex-col justify-between bg-219897 h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className=" flex flex-col ">
        <Link
          to="/"
          classname=" flex px-5 gap-2 my-6  pt-1 w-190  "
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="flex md:w-full w-200 md:h-20 h-100 px-10 md:item-start items-stcart" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill  className=" h-5 w-5"/> <label className=" text-2xl italic font-semibold">Home</label>
          </NavLink>
          <h3 className="mt-1 px-2 text-base 2xl:text-xl italic">
            Discover catagories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSidebar}
              key= {category.name}
            >
              <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" alt="category" />
              {category.name} <IoIosArrowForward />
            </NavLink>
          ))}
          
        </div>
      </div>
      {userPro && (
        <Link
        to={`/user-profile/${userPro._id}`}
        className="flex mx-2 my-5 mb-3 gap-2 items-center bg-cyan-300 rounded-lg shadow-lf"
        onClick={handleCloseSidebar}
        >
          <img src={userPro.image} className="w-10 h-10 rounded-full te" alt="user-profile" />
          <p>{userPro.userName}</p>
        </Link>
      )}


    </div>
  );
};

export default Sidebar;
