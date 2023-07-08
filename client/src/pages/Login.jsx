import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import videoFile from "../assets/video.mp4";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/action";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, login } = useSelector(
    (store) => store.auth
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (login === true) {
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        nav("/");
      }, 2000);
    }
    if (login === false) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [login, error]);

  const loginForm = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center">
        <ToastContainer
          position="top-right"
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
        <div className="flex relative h-[500px] justify-center items-center">
          <video className="h-[500px] rounded-md" muted loop autoPlay>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="lg:w-[60%] w-[90%] h-[95%]  backdrop-blur-md  bg-black/25 absolute lg:-left-16 border rounded justify-center text-white items-center flex flex-col">
            <form
              onSubmit={handleSubmit(loginForm)}
              className="justify-center text-white items-center flex flex-col gap-4"
            >
              <h2 className="text-lg font-semibold text-center">Login</h2>
              <input
                type="email"
                name="email"
                className="bg-transparent border-b-2 border-white pr-20 pl-6 py-2 outline-none "
                placeholder="Email"
                label="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
              />
              <p className="text-[#db5452] text-sm w-full">
                {errors?.email?.message}
              </p>
              <input
                type="password"
                className="bg-transparent border-b-2 border-white pr-20 pl-6 py-2 outline-none"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be more than 8 Character",
                  },
                })}
              />
              <p className="text-sm text-[#db5452] w-full">
                {errors?.password?.message}
              </p>
              <button
                type="submit"
                className="btn btn-outline w-full rounded-none"
              >
                {loading ? (
                  <span className="loading loading-dots loading-lg"></span>
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-sm font-md">
                Create new account ?<Link to="/signup"> Signup</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
