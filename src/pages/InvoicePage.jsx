import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function InvoicePage() {
  return (
    <div>
      <Navbar />
      <div class="bg-white rounded-lg shadow-2xl px-8 py-10 max-w-xl mx-auto mt-20">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <div class="font-semibold text-[1.75rem] text-[#061f77]">
              Kwata<span class="text-[#e3bf00]">Bus</span>
            </div>
          </div>
          <div class="text-right text-[#061f77]">
            <div class="font-bold text-xl mb-2">INVOICE</div>
            <div class="text-sm">Date: 29/05/2024</div>
            <div class="text-sm">Invoice No: INV/12345</div>
          </div>
        </div>
        <div class="border-b-2 border-gray-300 pb-8 mb-8 text-[0.825rem] md:text-[1rem]">
          <h2 class="text-[1rem] font-bold mb-4 text-[#061f77]">Bill To:</h2>
          <div class="text-[#061f77] mb-2">John Doe</div>
          <div class="text-[#061f77] mb-2">Kampala</div>
          <div class="text-[#061f77]">johndoe@example.com</div>
        </div>
        <div class="border-b-2 border-gray-300 pb-8 mb-8 text-[0.825rem] md:text-[1rem]">
          <h2 class="text-[1rem] font-bold mb-4 text-[#061f77]">
            Journey Details:
          </h2>
          <div class="text-[#061f77] mb-2">From: Kampala</div>
          <div class="text-[#061f77] mb-2">To: KABALE</div>
          <div class="text-[#061f77] mb-2">Departure: 29/05/2024, 08:00 AM</div>
          <div class="text-[#061f77] mb-2">Arrival: 29/05/2024, 05:00 PM</div>
          <div class="text-[#061f77] mb-2">Bus Service: Global Bus</div>
          <div class="text-[#061f77] mb-2">Bus Number: UBG 114H</div>
        </div>
        <table class="w-full text-left mb-8">
          <thead>
            <tr className="text-[0.8rem] md:text-[1rem]">
              <th class="text-[#061f77] font-bold uppercase py-2">Passenger</th>
              <th class="text-[#061f77] font-bold uppercase py-2">
                Seats Booked{" "}
              </th>
              <th class="text-[#061f77] font-bold uppercase py-2">
                Price/Seat{" "}
              </th>
              <th class="text-[#061f77] font-bold uppercase py-2 text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[0.825rem] md:text-[1rem]">
              <td class="py-4 text-[#061f77]">John Doe</td>
              <td class="py-4 text-[#061f77]">12A, 12B, 12C</td>
              <td class="py-4 text-[#061f77]">UGX.50000</td>
              <td class="py-4 text-[#061f77] text-right">UGX.150000</td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-end mb-8 text-[0.825rem] md:text-[1rem]">
          <div class="text-[#061f77] mr-4 font-semibold">Subtotal:</div>
          <div class="text-[#061f77]">UGX.150000</div>
        </div>
        <div class="flex justify-end mb-8">
          <div class="text-[#061f77] mr-4 font-semibold">Tax:</div>
          <div class="text-[#061f77]">UGX.7500</div>
        </div>
        <div class="flex justify-end mb-8 text-[0.825rem] md:text-[1rem]">
          <div class="text-[#061f77] mr-4 font-semibold">Total:</div>
          <div class="text-[#061f77] font-bold">UGX.157500</div>
        </div>
        <div class="border-t-2 border-gray-300 pt-8">
          <div class="text-[#061f77] mb-4 text-center">
            Please complete your cash payment when booking your ticket.
          </div>
          <div class="text-[#061f77] mb-4 text-center">
            *** Always carry ticket print outs and your ID while traveling ***
          </div>
          <div class="text-[#061f77] mb-4 text-center">Kampala, Uganda</div>
          <div class="text-[#061f77] mb-4 text-center">
            Note: This is an e-ticket and does not require a physical signature.
          </div>
        </div>
        <div class="flex justify-center text-right mt-4">
          <button
            type="button"
            class="flex items-center justify-center bg-[#061f77] text-white px-4 py-2 rounded-lg w-full md:w-[50%]"
          >
            <i class="bx bx-printer pr-2"></i>Print & Download
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InvoicePage;