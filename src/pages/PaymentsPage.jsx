import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userData } from "../UserHelper";

function PaymentsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = userData();
  if (!user.jwt) {
    navigate("/login");
  }
  const { state } = location;
  const { journeyDate, from, to, busCategory, selectedSeats, price } = state;
  
  return (
    <div>
      <Navbar />
      <div className="bg-white rounded-lg shadow-2xl px-8 py-10 max-w-xl mx-auto mt-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="font-semibold text-[1.75rem] text-[#061f77]">
              Kwata<span className="text-[#e3bf00]">Bus</span>
            </div>
          </div>
          <div className="text-right text-[#061f77]">
            <div className="font-bold text-xl mb-2">Booking Information</div>
            <div className="text-sm">
              Date: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 pb-8 mb-8 text-[0.825rem] md:text-[1rem]">
          <h2 className="text-[1rem] font-bold mb-4 text-[#061f77]">
            User Details:
          </h2>
          <div className="text-[#061f77] mb-2">{user.username}</div>
          <div className="text-[#061f77] mb-2">{user.email}</div>
          <div className="text-[#061f77]">+256 {user.phone}</div>
        </div>
        <div className="border-b-2 border-gray-300 pb-8 mb-8 text-[0.825rem] md:text-[1rem]">
          <h2 className="text-[1rem] font-bold mb-4 text-[#061f77]">
            Journey Details:
          </h2>
          <div className="text-[#061f77] mb-2">From: {from}</div>
          <div className="text-[#061f77] mb-2">To: {to}</div>
          <div className="text-[#061f77] mb-2">
            Departure: {journeyDate}, 08:00 AM
          </div>
          <div className="text-[#061f77] mb-2">Bus Service: {busCategory}</div>
        </div>
        <table className="w-full text-left mb-8">
          <thead>
            <tr className="text-[0.8rem] md:text-[1rem]">
              <th className="text-[#061f77] font-bold uppercase py-2">
                Passenger
              </th>
              <th className="text-[#061f77] font-bold uppercase py-2">
                Seats Booked{" "}
              </th>
              <th className="text-[#061f77] font-bold uppercase py-2">
                Price/Seat{" "}
              </th>
              <th className="text-[#061f77] font-bold uppercase py-2 text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[0.825rem] md:text-[1rem]">
              <td className="py-4 text-[#061f77]">{user.username}</td>
              <td className="py-4 text-[#061f77]">
                {selectedSeats.join(", ")}
              </td>
              <td className="py-4 text-[#061f77]">UGX.{parseInt(price)}</td>
              <td className="py-4 text-[#061f77] text-right">
                UGX.{selectedSeats.length * parseInt(price)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mb-8 text-[0.825rem] md:text-[1rem]">
          <div className="text-[#061f77]">
            UGX.{selectedSeats.length * parseInt(price)}
          </div>
        </div>
        <div className="flex justify-end mb-8 text-[0.825rem] md:text-[1rem]">
          <div className="text-[#061f77] mr-4 font-semibold">Total:</div>
          <div className="text-[#061f77] font-bold">
            UGX.{selectedSeats.length * parseInt(price)}
          </div>
        </div>
        <div className="border-t-2 border-gray-300 pt-8">
          <div className="text-[#061f77] mb-4 text-center">
            Please complete your booking by making payments
          </div>
        </div>
        <div className="flex justify-center text-right mt-4">
          <Link to="/PaymentMethods"
            type="button"
            className="flex items-center justify-center bg-[#061f77] text-white px-4 py-2 rounded-lg w-full md:w-[50%]"
          >
            Proceed To Payment
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentsPage;