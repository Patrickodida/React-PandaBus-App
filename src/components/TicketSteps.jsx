import React from "react";
import SvgDest from "../images/travel-together.svg";
import SvgChoose from "../images/select-seat.svg";
import PayTicket from "../images/stripe-payment.svg";

function TicketSteps() {
  return (
    <div>
      <section className="ticket-section w-4/5 max-w-screen-xl m-auto text-[#061f77] pt-5">
        <h2 className="text-4xl text-center my-6 font-bold">
          Get Your Tickets with Just 3 Steps
        </h2>
        <div className="card md:flex md:justify-center md:items-center md:gap-[10%] mb-12 border md:border-none shadow-md md:shadow-none ">
          <div className="icons-container w-1/2 h-auto flex justify-center text-[#061f77]  rounded-lg p-4 w-full m-auto md:shadow-2xl">
            <span className="md:flex md:justify-center font-bold text-[#061f77] pb-[30px] hidden text-[2.5rem] ">
              1
            </span>
            <img src={SvgDest} className="w-1/2 h-auto" />
          </div>
          <div className="text-container w-2/4  rounded p-4 w-full m-auto text-center ">
            <p>
              Choose your destination, origin, date, and then search for buses
            </p>
          </div>
        </div>

        <div className="card md:flex md:justify-center md:items-center md:gap-[10%] mb-12 border md:border-none shadow-md md:shadow-none">
          <div className="text-container w-2/4  rounded p-4 w-full m-auto text-center ">
            <p>Select a seat and make a booking</p>
          </div>
          <div className="icons-container w-1/2 h-auto flex justify-center text-[#061f77]  rounded-lg p-4 w-full m-auto md:shadow-2xl">
            <span className="md:flex md:justify-center font-bold text-[#061f77] pb-[30px] hidden text-[2.5rem] ">
              2
            </span>
            <img src={SvgChoose} className="" />
          </div>
        </div>

        <div className="card md:flex md:justify-center md:items-center md:gap-[10%] mb-12 border md:border-none shadow-md md:shadow-none">
          <div className="icons-container w-1/2 h-auto flex justify-center text-[#061f77]  rounded-lg p-8 w-full m-auto md:shadow-2xl">
            <span className="md:flex md:justify-center font-bold text-[#061f77] pb-[30px] hidden text-[2.5rem] ">
              3
            </span>
            <img src={PayTicket} className="" />
          </div>
          <div className="text-container w-2/4  rounded p-4 w-full m-auto text-center ">
            <p>Pay for your seat using payment options provided</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TicketSteps;
