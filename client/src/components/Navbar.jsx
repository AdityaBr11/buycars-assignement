import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Navbar = () => {
    const { user } = useSelector((store) => store.auth);

  return (
    <div className="w-full fixed top-6">
      <div className="w-[95%] py-4 px-8 bg-white text-black text-lg rounded-full h-full mx-auto">
        <div className="flex justify-between items-center w-full z-50">
          <div className="">
            <img src={logo} alt="" className="w-6 scale-[5]" />
            {/* logo */}
          </div>
          <div className="flex justify-center items-center gap-6">
            <Link to='/inventory'>Inventary</Link>
            <Link to='/oem'>OEMs</Link>
            <Link to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
