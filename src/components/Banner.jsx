import React from "react";
import BusImage from "../images/Bus-Image.png";

function Banner({ title }) {
  return (
    <div>
      <section className="banner-section relative bg-cover bg-center mt-10  ">
        <div className="banner-overlay absolute top-[0] left-[0] w-full h-[100%] inset-0 bg-gradient-to-t from-black to-transparent rounded"></div>
        <div className="banner-content ">
          <img src={BusImage} alt="Bus Image" className="w-full h-[200px] " />
          <div className="hero-text w-2/4 font-bold leading-tight text-2xl lg:text-4xl lg:text-left text-center">
            <h1 className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-[50%] z-10 text-white flex items-center">
              {title}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;