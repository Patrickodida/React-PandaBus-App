import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { userData, storeUser } from "../UserHelper";

function Help() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [isHidden, setisHidden] = useState(true);
  const [isHiddenTwo, setIsHiddenTwo] = useState(true);
  const [isHiddenThree, setIsHiddenThree] = useState(true);

  useEffect(() => {
    const user = userData();
    if (user && user.username) {
      setIsLoggedIn(true);
      setUsername(user.username);
    }
    window.scrollTo(0, 0);
    setisHidden(!isHidden);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    storeUser({});
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  const toggleAccordionOne = () => {
    setisHidden(!isHidden);
  };

  const toggleAccordionTwo = () => {
    setIsHiddenTwo(!isHiddenTwo);
  };

  const toggleAccordionThree = () => {
    setIsHiddenThree(!isHiddenThree);
  };

  return (
    <div>
      <div className="nav-section bg-[#fefefe]">
        <div className="flex justify-between p-4 m-auto items-center font-bold text-[#061f77] w-[90%] m-auto">
          <Link to="/" className="site-title font-bold text-2xl">
            Kwata<span style={{ color: "#e3bf00" }}>Bus</span>
          </Link>
          {isLoggedIn ? (
            <ul className="flex">
              <li>
                <span>
                  <i className="bx bx-user pr-2 font-bold"></i>
                </span>
                <span className="nav-links">{username}</span>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="button-link rounded-2xl ml-8 font-normal"
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex">
              <li>
                <Link
                  className="nav-links"
                  to="/login"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  className="nav-links button-link rounded-2xl ml-8 font-normal"
                  to="/login"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="header p-4 w-full bg-[#061f77]">
          <div className="w-[90%] m-auto">
            <Link
              className="text-white text-2xl font-bold w-[90%] m-auto"
              to="/help"
            >
              Help
            </Link>
            <span className="text-[#fefefe] text-[1.5rem] ml-[2em]">|</span>
          </div>
        </div>
      </div>

      <div className="faq-section w-[80%] sm:w-[70%] m-auto mt-20 text-[#061f77]">
        <h1 className="text-center p-2 text-[#061f77] font-bold text-2xl w-full">
          FREQUENTLY ASKED QUESTIONS (FAQS)
        </h1>
        <div id="accordionExample" className="mt-4">
          <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark">
            <h2 className="mb-0" id="headingOne">
              <button
                className="group relative flex w-full items-center rounded-t-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white"
                type="button"
                onClick={toggleAccordionOne}
                aria-expanded={!isHidden}
                aria-controls="collapseOne"
              >
                HOW DO I BUY TICKETS?
                <span className="ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out transform group-focus:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
            </h2>
            <div
              id="collapseOne"
              className={`!visible ${isHidden ? "hidden" : ""}`}
            aria-labelledby="headingOne"
            >
            <div className="px-5 py-4">
                Visit the official website of the tickecting platform, search for the journey and number of tickets to purchase.
                Add the tickets and your payment information and any required details.
                Review your order to ensure everything is correct. Complete the purchase and wait for a confirmation with your tickets.
            </div>
          </div>
        </div>
        <div className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark">
          <h2 className="mb-0" id="headingTwo">
            <button
              className="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white"
              type="button"
              onClick={toggleAccordionTwo}
              aria-expanded={!isHiddenTwo}
              aria-controls="collapseTwo"
            >
                CAN THE TICKET BE SENT TO ME VIA SMS?
              <span className="ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out transform group-focus:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className={`!visible ${isHiddenTwo ? "hidden" : ""}`}
          aria-labelledby="headingTwo"
            >
          <div className="px-5 py-4">
                Yes, you could recieved your ticket or various tickets via SMS.
                Follow the given payment instructions and fulfill all the required extra details asked for.
                Your tickects or ticket will be received on your mobile device as an SMS with confirmation of the payment.
          </div>
        </div>
      </div>
      <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark">
        <h2 className="mb-0" id="headingOne">
          <button
            className="group relative flex w-full items-center rounded-t-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white"
            type="button"
            onClick={toggleAccordionThree}
            aria-expanded={!isHiddenThree}
            aria-controls="collapseOne"
          >
                I HAVE PURCHASED A TICKET BUT HAVE NOT RECEIVED A MESSAGE?
            <span className="ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out transform group-focus:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseOne"
          className={`!visible ${isHiddenThree ? "hidden" : ""}`}
        aria-labelledby="headingOne"
            >
        <div className="px-5 py-4">
                I'm sorry to hear that you haven't received a message after purchasing the ticket. Have you checked your spam or junk folder?
                If you still haven't received it. Our recommendation is that you try reaching out or contacting the ticket providers directly.
                Inquire about the status of your ticket and ensure you receive it promptly.
        </div>
      </div>
    </div>
        </div >
      </div >
    <Footer />
    </div >
  );
}

export default Help;
