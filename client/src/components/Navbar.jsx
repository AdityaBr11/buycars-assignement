import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/auth/action";
import { LOGOUT_USER } from "../redux/auth/actionType";

const Navbar = () => {
  const dispatch = useDispatch();
  const { crediantial, loading, user } = useSelector((store) => store.auth);

  // useEffect(() => {
  //     dispatch(loadUser());
  //   }, [dispatch]);

  const logout = () => {
    dispatch({ type: LOGOUT_USER });
    toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="w-full fixed">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full py-4 px-8 bg-gray-200 text-black text-lg  h-full ">
        <div className="flex justify-between items-center w-full z-50">
          <Link to="/">
            <div className="">
              <img src={logo} alt="" className="w-6 scale-[5]" />
              {/* logo */}
            </div>
          </Link>
          <div className="flex justify-center items-center gap-6">
            <Link to="/oem">OEMs</Link>
            <Link to="/inventory">Inventary</Link>

            {crediantial ? (
              <div className="cursor-pointer" onClick={logout}>
                {" "}
                Logout{" "}
              </div>
            ) : (
              <div>
                {" "}
                <Link to="/login">Login</Link>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
