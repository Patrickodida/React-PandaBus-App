import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

function ExecBusSeat() {
  return (
    <div>
      <Navbar />
      <Banner />
      <div className="flex justify-center flex-col md:flex-row gap-[10%] m-auto w-[80%] mt-[2em] mb-[2em]">
        <section className="text-[#061f77] font-bold text-[1.25rem] md:w-full md:m-auto mb-[4em]">
          <form className="border border-gray-300 shadow-md p-16">
            <div className="relative flex flex-col flex-start mb-4">
              <label htmlfor="date" className="m-[0]">
                Journey Date
              </label>
              <input
                type="text"
                id="date"
                className="rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              />
              <span className="absolute top-[80%] transform -translate-y-1/2 left-[5%] text-[#061f77] text-[16px] ">
                <i className="bx bxs-calendar"></i>
              </span>
            </div>
            <div className="relative flex flex-col flex-start mb-4">
              <label htmlfor="date">From</label>
              <input
                type="text"
                id="date"
                className="rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              />
              <span className="absolute top-[80%] transform -translate-y-1/2 right-[5%] text-[#061f77] text-[16px] ">
                <i className="bx bxs-down-arrow text-[#061f77]"></i>
              </span>
            </div>

            <div className="relative flex flex-col flex-start mb-4">
              <label htmlfor="date">To</label>
              <input
                type="text"
                id="date"
                className="rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              />
              <span className="absolute top-[80%] transform -translate-y-1/2 right-[5%] text-[#061f77] text-[16px] ">
                <i className="bx bxs-down-arrow"></i>
              </span>
            </div>

            <div className="relative flex flex-col flex-start mb-4">
              <label htmlfor="date">Bus Category</label>
              <input
                type="text"
                id="date"
                placeholder="Executive"
                className="rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              />
              <span className="absolute top-[80%] transform -translate-y-1/2 right-[5%] text-[#061f77] text-[16px] ">
                <i className="bx bxs-down-arrow"></i>
              </span>
            </div>
            <div className="block">
              <button
                type="submit"
                className="mt-4 w-4/5 font-medium text-base rounded py-2 font-bold"
              >
                Continue
              </button>
            </div>
          </form>
        </section>

        <section className="md:w-full md:m-auto">
          <h1 className="font-bold text-[1.25rem] text-center mb-4 text-[#061f77]">
            Click on Seat to select or deselect
          </h1>
          <div className="seat-section border border-gray-300 shadow-md p-6">
            <div className="flex justify-center gap-20 text-[text] text-[#061f77] text-[1.25rem] ">
              <div className="left-row">
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    1
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    2
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    3
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    4
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    7
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    8
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="font-bold">Door</div>
                  <div className=""></div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    S
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    S
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    15
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    16
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    19
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    20
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    23
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    24
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    27
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    28
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    31
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    32
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    35
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    36
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    39
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    40
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    43
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    44
                  </div>
                </div>
              </div>

              <div className="right-row">
                <div className="row flex gap-5 mb-4">
                  <div className=""></div>
                  <div className="font-bold ml-5">Driver</div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    5
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    6
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    9
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    10
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    11
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    12
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    13
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    14
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    17
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    18
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    21
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    22
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    25
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    26
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    29
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    30
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    33
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    34
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    37
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    38
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    41
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    42
                  </div>
                </div>
                <div className="row flex gap-5 mb-4">
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    45
                  </div>
                  <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center">
                    46
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="sort-seats flex gap-5 mb-2">
              <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2.25em] text-center"></div>
              <div>Available seats</div>
            </div>
            <div className="sort-seats flex gap-5 mb-2">
              <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2.25em] text-center bg-[#069306]"></div>
              <div>Selected by You</div>
            </div>
            <div className="sort-seats flex gap-5 mb-2">
              <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2.25em] text-center bg-gray-500"></div>
              <div>Booked by Others</div>
            </div>
            <div className="sort-seats flex gap-5 mb-2">
              <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2.25em] text-center">
                s
              </div>
              <div>Staff seat</div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default ExecBusSeat;
