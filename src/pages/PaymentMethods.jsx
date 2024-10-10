import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import MtnImage from "../images/Mtn.jpeg";
import AirtelImage from "../images/Airtel.jpeg";
import FlutterwaveImage from "../images/flutterwave.jpeg";
import { Link } from "react-router-dom";

function PaymentMethods() {
  return (
    <div>
      <Navbar />
      <Banner title={"Payment Methods"} />
      <section className="md:flex  md:gap-[10%] w-[80%] m-auto mt-20">
        <div className="py-4 px-4 mb-8 shadow-2xl text-center">
          <div>
            <img src={FlutterwaveImage} alt="" className="w-full h-full" />
          </div>
          <div>
            <button className="w-full">Pay Now</button>
          </div>
        </div>
        <div className="py-4 px-4 mb-8 shadow-2xl text-center">
          <div>
            <img src={MtnImage} alt="" className="w-full h-full" />
          </div>
          <div>
            <button className="w-full">Pay Now</button>
          </div>
        </div>
        <div className="py-4 px-4 mb-8 shadow-2xl text-center">
          <div>
            <img src={AirtelImage} alt="" className="w-full h-full" />
          </div>
          <div>
            <button className="w-full">Pay Now</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default PaymentMethods;
