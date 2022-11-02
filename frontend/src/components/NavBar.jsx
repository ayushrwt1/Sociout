import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import useAuthStore from "../store/authStore";

const NavBar = ({ searchTerm, setSearchTerm, user }) => {
  const { userPro } = useAuthStore();
  const navigate = useNavigate();
  if (!userPro) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
      <div className="flex justify-start items-center w-full px-2 rounded-full bg-white border-none outline-none focus-within:shadow-sm">
      <IoMdSearch fontSize={21} className="ml-1" />
      <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-white outline-none"
          />
      </div>
      <div className="flex gap-3">
      <Link to={`/user-profile/${userPro?._id}`} className="hidden md:block">
          <img src={userPro?.image} alt="logo" className="w-12 h-12 rounded-full" />
        </Link>
        <Link to="/create-pin" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAdd />
          </Link>
      </div>
    </div>
  );
};

export default NavBar;
