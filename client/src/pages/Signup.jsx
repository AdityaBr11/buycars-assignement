import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import videoFile from "../assets/video.mp4";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/auth/action";

function Signup() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading, signup, error, isAuthenticated } = useSelector(
    (store) => store.auth
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (signup === true) {
      toast.success("Signup Successfully", {
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
        nav("/login");
      }, 2000);
    }
    if (signup === false) {
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
  }, [signup, error]);

  const signupForm = (data) => {
    console.log(data);
    dispatch(signupUser(data));
  };
  return (
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
        <div className="lg:w-[60%] w-[90%] h-[95%]  backdrop-blur-sm  bg-black/25 absolute lg:-right-16 border rounded justify-center text-white items-center flex flex-col">
          <form
            onSubmit={handleSubmit(signupForm)}
            className="justify-center text-white items-center flex flex-col gap-4"
          >
            <h2 className="text-lg font-semibold text-center">SignUp</h2>

            <input
              type="text"
              className=" bg-transparent border-b-2 border-white pr-20 pl-6 py-2 outline-none"
              placeholder="Username"
              {...register("name", {
                required: "Username is required",
              })}
            />
            <p className="text-[#db5452] text-sm w-full">
              {errors?.name?.message}
            </p>
            <input
              type="email"
              className="bg-transparent border-b-2 border-white pr-20 pl-6 py-2 outline-none "
              placeholder="Email"
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
                "Signup"
              )}
            </button>
            <p className="text-sm font-md">
              Already have an account ? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
