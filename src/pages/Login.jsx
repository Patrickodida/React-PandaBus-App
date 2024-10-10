import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import { storeUser } from "../UserHelper";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Navigating to booking page...");
      navigate("/booking");
    }
  }, [isLoggedIn, navigate]);

  const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
      setErrors({ ...errors, email: "Invalid email format." });
      return false;
    }
    setErrors({ ...errors, email: "" });
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters long.",
      });
      return false;
    }
    setErrors({ ...errors, password: "" });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid =
      validateEmail(input.email) && validatePassword(input.password);
    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:6500/api/v1/users/login",
        input
      );
      console.log(response);

      // Store token securely in localStorage
      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token); // Store the token
        storeUser(response.data); // Store user data if necessary
        console.log("Token stored:", localStorage.getItem("authToken"));
        setIsLoggedIn(true); // Update login state
      } else {
        setErrors({
          ...errors,
          general: "Invalid email/password combination.",
        });
        throw new Error("Invalid email/password combination.");
      }
    } catch (error) {
      console.error(error);
      setErrors({ 
        ...errors, 
        general: error.response?.data?.message || "Login failed. Please try again.",
      });
    } 
  /* const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/booking");
    }
  }, [isLoggedIn, navigate]);

  const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
      setErrors({ ...errors, email: "Invalid email format." });
      return false;
    }
    setErrors({ ...errors, email: "" });
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters long.",
      });
      return false;
    }
    setErrors({ ...errors, password: "" });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid =
      validateEmail(input.email) && validatePassword(input.password);
    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:6500/api/v1/users/login",
        input
      );
      console.log(response)

      if (response.data && response.data.token) {
  storeUser(response.data);
  console.log(localStorage.getItem("token"));
  setIsLoggedIn(true);
  navigate("/booking");
} else {
  setErrors({
    ...errors,
    general: "Invalid email/password combination.",
  });
  throw new Error("Invalid email/password combination.");
}
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, general: "Login failed. Please try again.",})
    } */
  };

  return (
    <div>
    <Navbar/>
      <section className=" p-8 mt-20">
    <div className="bg-white rounded-2xl border-[#061f77] w-full md:w-[50%] m-auto pt-[2em] pb-[2em] border-8">
        <Link to="/">
          <h1 className="font-bold text-4xl text-[#061f77] text-center mb-[1em]">
            Kwata<span className="text-[#e3bf00]">Bus</span>
          </h1>
        </Link>
        <h2 className="text-center text-3xl font-bold text-[#061f77]">
          Sign In
        </h2>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div className="flex w-[80%] m-auto justify-center">
              <label htmlFor="email" className="text-lg m-[0] font-normal" />
              <input
                id="email"
                type="email"
                className="w-4/5 rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
                placeholder="Email"
                onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
                  validateEmail(e.target.value);
                }}
                value={input.email}
              />
            </div>
            {errors.email && (
              <p className="text-center text-red-500">{errors.email}</p>
            )}
            <div className="relative flex w-[80%] m-auto justify-center">
              <label htmlFor="password" className="text-lg m-[0] font-normal" />
              <input
                id="password"
                type="password"
                className="w-4/5 rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
                placeholder="Password"
                onChange={(e) => {
                  setInput({ ...input, password: e.target.value });
                  validatePassword(e.target.value);
                }}
                value={input.password}
              />
              <span className="absolute top-[55%] transform -translate-y-1/4 right-[15%] text-[#061f77] text-[20px]">
                <i className="bx bx-low-vision"></i>
              </span>
            </div>
            {errors.password && (
              <p className="text-center text-red-500">{errors.password}</p>
            )}
            <div className="mt-8 flex justify-center">
              <div>
                <p className="text-center text-[#e3bf00]">Forgot password?</p>
              </div>
            </div>
            <div className="flex justify-center m-auto w-[80%]">
              <button
                type="submit"
                className="mt-4 w-4/5 font-medium text-base rounded py-2 font-bold"
              >
                Sign in
              </button>
            </div>
          </form>
          {errors.general && <p className="text-red-500">{errors.general}</p>}
          <div>
            <p className="mt-4 text-[#061f77] text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#e3bf00]">
                Sign up
              </Link>
            </p>
          </div>
          <div className="mt-8 flex-col gap-y-4">
            <p className="text-[#061f77] text-center">Or</p>
            <div className="flex justify-center m-auto w-[80%]">
              <Link className="flex w-4/5 py-2 mt-4 items-center justify-center gap-2 active:scale-[.98] hover:scale-[1.01] transition-all rounded bg-[#061f77] text-white text-[0.75rem] md:text-lg font-bold border border-gray-300 text-[#061f77] focus:outline-none">
                <i className="bx bxl-google mr-2"></i>Sign in with Google
              </Link>
            </div>
            <div className="flex justify-center m-auto w-[80%]">
              <Link className="flex w-4/5 py-2 mt-4 items-center justify-center gap-2 active:scale-[.98] hover:scale-[1.01] transition-all rounded bg-[#061f77] text-white text-[0.75rem] md:text-lg font-bold border border-gray-300 text-[#061f77] focus:outline-none">
                <i className="bx bxl-facebook-circle mr-2"></i>Sign in with Facebook
              </Link>
            </div>
          </div>
        </div>
    </div>
    </section>
    <Footer/>
    </div>
  );
}

export default Login;
