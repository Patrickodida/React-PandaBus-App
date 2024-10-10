import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Signup() {
  const [input, setInput] = useState({
    email: "",
    MobileNumber: "",
    FirstName: "",
    LastName: "",
    username: "",
    password: "",
    role: "Public",
    confirmed: true,
    blocked: false,
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    MobileNumber: "",
    FirstName: "",
    LastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // validate Email
  function validateEmail(email) {
    if (!validator.isEmail(email)) {
      setError({ ...error, email: "Invalid email" });
      return false;
    }
    setError({ ...error, email: "" });
    return true;
  }
  // validate MobileNumber
  function validateMobileNumber(MobileNumber) {
    if (MobileNumber.length !== 10) {
      setError({ ...error, MobileNumber: "Invalid Entry" });
      return false;
    }
    setError({ ...error, MobileNumber: "" });
    return true;
  }
  // validate FirstName
  function validateFirstName(FirstName) {
    let FirstNameRegexp = /^[a-zA-Z]+$/;
    if (!FirstNameRegexp.test(FirstName)) {
      setError({ ...error, FirstName: "Invalid First Name" });
      return false;
    }
    setError({ ...error, FirstName: "" });
    return true;
  }

  // validate LastName
  function validateLastName(LastName) {
    let LastNameRegexp = /^[a-zA-Z]+$/;
    if (!LastNameRegexp.test(LastName)) {
      setError({ ...error, LastName: "Invalid Last Name" });
      return false;
    }
    setError({ ...error, LastName: "" });
    return true;
  }

  // Validate userName
  function validateUserName(username) {
    let userNameRegexp = /^[a-zA-Z]+$/;
    if (!userNameRegexp.test(username)) {
      setError({ ...error, username: "Invalid UserName" });
      return false;
    }
    setError({ ...error, username: "" });
    return true;
  }

  // Validate Password
  function validatePassword(password) {
    if (password.length < 8) {
      setError({ ...error, password: "Invalid Password" });
      return false;
    }
    setError({ ...error, password: "" });
    return true;
  }

  // Validate Confirm Password
  function validateConfirmPassword(confirmPassword) {
    if (confirmPassword.length < 8) {
      setError({ ...error, confirmPassword: "Invalid Password" });
      return false;
    }
    setError({ ...error, confirmPassword: "" });
    return true;
  }

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:1337/api/auth/local/register",
        input
      )
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        setError("Not Signed Up, Try again!");
        console.log(error);
      });
  };
  return (
    <div>
    <Navbar/>
    <section className="p-8 mt-20">
      <div className="bg-white rounded-2xl border-[#061f77] w-full md:w-[50%] m-auto pt-[2em] pb-[2em] border-8">
        <Link to="/">
          <h1 className="font-bold text-4xl text-[#061f77] text-center mb-[1em]">
            Kwata<span className="text-[#e3bf00]">Bus</span>
          </h1>
        </Link>
        <h2 className="text-center text-3xl font-bold text-[#061f77]">
          Sign Up
        </h2>
        <form onSubmit={submitHandler} className="mt-4 ">
          <div className="flex w-[80%] m-auto justify-center">
            <label for="email" className="text-lg m-[0]" />
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
          {error.email && (
            <p className="text-center text-red-500">{error.email}</p>
          )}

          <div className="flex w-[80%] m-auto justify-center ">
            <label for="MobileNumber" className="text-lg m-[0] font-normal" />
            <input
              id="MobileNumber"
              type="text"
              className="w-4/5 rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              placeholder="Mobile Number"
              onChange={(e) => {
                setInput({ ...input, MobileNumber: e.target.value });
                validateMobileNumber(e.target.value);
              }}
              value={input.MobileNumber}
            />
          </div>
          {error.MobileNumber && (
            <p className="text-center text-red-500">{error.MobileNumber}</p>
          )}
          <div className="flex w-[80%] m-auto justify-center">
            <label for="FirstName" className="text-lg m-[0]" />
            <input
              id="FirstName"
              type="text"
              className="w-4/5 rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              placeholder="First Name"
              onChange={(e) => {
                setInput({ ...input, FirstName: e.target.value });
                validateFirstName(e.target.value);
              }}
              value={input.FirstName}
            />
          </div>
          {error.FirstName && (
            <p className="text-center text-red-500">{error.FirstName}</p>
          )}
          <div className="flex w-[80%] m-auto justify-center">
            <label for="LastName" className="text-lg m-[0]" />
            <input
              id="LastName"
              type="text"
              className="w-4/5 rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              placeholder="Last Name"
              onChange={(e) => {
                setInput({ ...input, LastName: e.target.value });
                validateLastName(e.target.value);
              }}
              value={input.LastName}
            />
          </div>
          {error.LastName && (
            <p className="text-center text-red-500">{error.LastName}</p>
          )}
          <div className="flex w-[80%] m-auto justify-center">
            <label for="userName" className="text-lg m-[0]" />
            <input
              id="userName"
              type="text"
              className="w-4/5 rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              placeholder="Username"
              onChange={(e) => {
                setInput({ ...input, username: e.target.value });
                validateUserName(e.target.value);
              }}
              value={input.username}
            />
          </div>
          {error.username && (
            <p className="text-center text-red-500">{error.username}</p>
          )}
          <div className="relative flex w-[80%] m-auto justify-center">
            <label for="password" className="text-lg m-[0] font-normal" />
            <input
              id="password"
              type="password"
              className="w-4/5 rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              placeholder="Create password"
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
          {error.password && (
            <p className="text-center text-red-500">{error.password}</p>
          )}
          <div className="relative flex w-[80%] m-auto justify-center">
            <label
              for="confirmPassword"
              className="text-lg m-[0] font medium"
            />
            <input
              id="confirmPassword"
              type="password"
              className="w-4/5 rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              placeholder="Confirm password"
              onChange={(e) => {
                setInput({ ...input, confirmPassword: e.target.value });
                validateConfirmPassword(e.target.value);
              }}
              value={input.confirmPassword}
            />
            <span className="absolute top-[55%] transform -translate-y-1/4 right-[15%] text-[#061f77] text-[20px]">
              <i className="bx bx-low-vision"></i>
            </span>
          </div>
          {error.confirmPassword && (
            <p className="text-center text-red-500">{error.confirmPassword}</p>
          )}
          <div className="mt-8 flex justify-center"></div>
          <div className="flex justify-center m-auto w-[80%]">
            <button
              type="submit"
              className="mt-4 font-medium text-base w-4/5 rounded py-2 font-bold"
            >
              Sign up
            </button>
          </div>
          <div>
            <p className="text-center mt-4 text-[#061f77]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#e3bf00] font-bold">
                Sign in
              </Link>
            </p>
          </div>
          <div className="mt-8 flex-col gap-y-4">
            <p className="text-center text-[#061f77]">Or</p>
            <div className="flex justify-center m-auto w-[80%]">
              <Link className="flex w-4/5 py-2 mt-4 items-center justify-center gap-2 active:scale-[.98] hover:scale-[1.01] transition-all rounded bg-[#061f77] text-white text-[0.75rem] md:text-lg font-bold border border-gray-300 text-[#061f77] focus:outline-none">
                <i className="bx bxl-google mr-2"></i> Sign up with Google
              </Link>
            </div>
            <div className="flex justify-center m-auto w-[80%]">
              <Link className="flex w-4/5 py-2 mt-4 items-center justify-center gap-2 active:scale-[.98] hover:scale-[1.01] transition-all rounded bg-[#061f77] text-white text-[0.75rem] md:text-lg font-bold border border-gray-300 text-[#061f77] focus:outline-none">
                <i className="bx bxl-facebook-circle mr-2"></i>Sign up with Facebook
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
    <Footer/>
    </div>
  );
}

export default Signup;
