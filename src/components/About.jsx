import React from "react";
import SvgSmartphone from "../images/order-car.svg";
import SvgPeople from "../images/online-payment.svg";

function About() {
  return (
    <div>
      <section
        id="about"
        className="about about-section w-4/5 max-w-screen-xl m-auto text-center pt-20"
      >
        <h2 className="text-4xl text-center mb-6 font-bold">About</h2>
        <div className="section-1 md:flex flex-col md:flex-row md:justify-center items-center gap-[10%] mb-16 ">
          <div className="image md:w-1/2 h-auto flex justify-center rounded-lg p-4 shadow-2xl w-full mb-8">
            <img src={SvgSmartphone} className="" />
          </div>
          <div className="text md:w-1/2 text-center md:text-left w-full">
            <p>
              Welcome to KwataBus – your hassle-free platform for bus bookings!
              At KwataBus, we prioritize seamless travel experiences. Whether
              for work or adventure, we believe every journey should be
              comfortable and memorable. Our user-friendly platform prioritizes
              your needs. Founded on reliability and efficiency, KwataBus
              revolutionizes bus ticket booking. Easily compare schedules,
              select routes, and secure seats from home or on-the-go with our
              mobile app.
            </p>
          </div>
        </div>
        <div className="section-2 md:flex flex-col md:flex-row md:justify-center md:items-center gap-[10%] mb-4">
          <div className="text md:w-1/2 w-full text-center md:text-left mb-8 order-2 md:order-1">
            <p>
              At KwataBus, we're more than a booking platform – we're your
              trusted travel companion. Our dedicated team ensures every aspect
              of your journey is covered, from reservation to arrival. Need
              assistance or travel tips? Our customer support team is here for
              you. Safety is paramount; we partner with reputable operators and
              prioritize your well-being with well-maintained vehicles and
              experienced drivers. Committed to sustainability, we promote bus
              travel as an eco-friendly choice for a greener future.
            </p>
          </div>
          <div className="image md:w-1/2 w-full h-auto flex justify-center rounded-lg p-4 shadow-2xl order-1 md:order-2 ">
            <img src={SvgPeople} className="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
