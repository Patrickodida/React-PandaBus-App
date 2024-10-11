import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import axios from "axios";
import { userData } from "../UserHelper";

function OrdBusSeat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [busService, setBusService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedByOthersSeats, setSelectedByOthersSeats] = useState([]);
  const [journeyDate, setJourneyDate] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  const user = userData();
  if (!user.jwt) {
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get(`http://localhost:6500/api/v1/busRoutes/${id}?populate=*`)
      .then((response) => {
        setBusService(response.data.data.attributes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bus service data:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (journeyDate) {
      axios
        .get(`http://localhost:6500/api/v1/busRoutes/${id}?populate=*`)
        .then((response) => {
          const seats = response.data.data.attributes.seats.data;
          const bookedSeats = seats
            .filter((seat) => seat.attributes.booked)
            .map((seat) => seat.attributes.seatNumber);
          const selectedByOthersSeats = seats
            .filter((seat) => seat.attributes.selectedByOthers)
            .map((seat) => seat.attributes.seatNumber);
          setBookedSeats(bookedSeats);
          setSelectedByOthersSeats(selectedByOthersSeats);
        })
        .catch((error) => {
          console.error("Error fetching seat availability data:", error);
        });
    }
  }, [id, journeyDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!busService) {
    return <div>Error loading bus service data</div>;
  }

  const handleSeatClick = (seatNumber) => {
    if (
      !bookedSeats.includes(seatNumber) &&
      !selectedByOthersSeats.includes(seatNumber) &&
      seatNumber !== "S" &&
      seatNumber !== "Driver"
    ) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.includes(seatNumber)
          ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
          : [...prevSelectedSeats, seatNumber]
      );
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const journeyDetails = {
      journeyDate,
      from: busService.DepartureTown,
      to: busService.ArrivalTown,
      busCategory: busService.bus_services.data[0].attributes.Name,
      selectedSeats,
      user,
      price: busService.Fare,
    };

    const selectedSeatIds = busService.seats.data
      .filter((seat) => selectedSeats.includes(seat.attributes.seatNumber))
      .map((seat) => seat.id);

    const updateData = {
      data: {
        seats: selectedSeatIds.map((seatId) => ({
          id: seatId,
          booked: true,
          user: userId,
        })),
      },
    };

    axios
      .put(`http://localhost:6500/api/v1/busRoutes/${id}`,updateData)
      .then((response) => {
        navigate("/PaymentsPage", { state: journeyDetails });
      })
      .catch((error) => {
        setError("Booking not successful, try again!");
        console.error(error);
      });
  };

  const renderSeat = (seatNumber, index) => (
    <div
      key={index}
      className={`seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2em] text-center ${
        selectedSeats.includes(seatNumber)
          ? "bg-[#069306]"
          : bookedSeats.includes(seatNumber)
          ? "bg-gray-500"
          : selectedByOthersSeats.includes(seatNumber)
          ? "bg-[#ff4500]" // Example color for seats selected by others
          : seatNumber === "S" || seatNumber === "Driver"
          ? "bg-[#e3bf00]"
          : ""
      } ${
        !bookedSeats.includes(seatNumber) &&
        !selectedByOthersSeats.includes(seatNumber) &&
        seatNumber !== "S" &&
        seatNumber !== "Driver"
          ? "cursor-pointer"
          : ""
      }`}
      onClick={() => handleSeatClick(seatNumber)}
    >
      {seatNumber}
    </div>
  );

  return (
    <div>
      <Navbar />
      <Banner title="Select Your Seat" />
      <div className="flex justify-center flex-col md:flex-row gap-[10%] m-auto w-[80%] mt-[2em] mb-[2em]">
        <section className="text-[#061f77] font-bold text-[1.25rem] md:w-full md:m-auto mb-[4em]">
          <form
            className="border border-gray-300 shadow-md p-16"
            onSubmit={handleSubmit}
          >
            <div className="relative flex flex-col flex-start mb-4">
              <label htmlfor="date" className="m-[0]">
                Journey Date
              </label>
              <input
                type="date"
                id="date"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              />
            </div>
            <div className="relative flex flex-col flex-start mb-4">
              <label htmlfor="from">From</label>
              <input
                type="text"
                id="from"
                value={busService.DepartureTown}
                readOnly
                className="rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              />
            </div>
            <div className="relative flex flex-col flex-start mb-4">
              <label htmlfor="to">To</label>
              <input
                type="text"
                id="to"
                value={busService.ArrivalTown}
                readOnly
                className="rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              />
            </div>
            <div className="relative flex flex-col flex-start mb-4">
              <label htmlfor="busCategory">Bus Service</label>
              <input
                type="text"
                id="busCategory"
                value={busService.bus_services.data[0].attributes.Name}
                readOnly
                className="rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              />
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
            <div className="flex justify-center gap-10 text-[#061f77] text-[1.25rem]">
              <div className="left-row">
                {[
                  [1, 2],
                  [3, 4],
                  [8, 9],
                  ["Door", ""],
                  ["S", "S"],
                  [19, 20],
                  [24, 25],
                  [29, 30],
                  [34, 35],
                  [39, 40],
                  [44, 45],
                  [49, 50],
                  [54, 55],
                  [59, 60],
                ].map((row, rowIndex) => {
                  if (row[0] === "Door" && row[1] === "") {
                    return (
                      <div
                        key={rowIndex}
                        className="row flex gap-5 mb-4 font-bold"
                      >
                        <div className="door flex flex-col justify-center">
                          <span>Door</span>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={rowIndex} className="row flex gap-5 mb-4">
                        {row.map((seat, index) => renderSeat(seat, index))}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="right-row">
                {[
                  ["", "Driver"],
                  [5, 6, 7],
                  [10, 11, 12],
                  [13, 14, 15],
                  [16, 17, 18],
                  [21, 22, 23],
                  [26, 27, 28],
                  [31, 32, 33],
                  [36, 37, 38],
                  [41, 42, 43],
                  [46, 47, 48],
                  [51, 52, 53],
                  [56, 57, 58],
                  [61, 62, 63]
                ].map((row, rowIndex) => {
                  if (row[0] === "" && row[1] === "Driver") {
                    return (
                      <div
                        key={rowIndex}
                        className="row flex gap-5 mb-4 font-bold"
                      >
                        <div className="empty flex flex-col justify-center">
                          <span></span>
                        </div>
                        <div className="driver flex flex-col justify-center">
                          <span>Driver</span>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={rowIndex} className="row flex gap-5 mb-4">
                        {row.map((seat, index) => renderSeat(seat, index))}
                      </div>
                    );
                  }
                })}
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
              <div className="seat border-2 border-[#061f77] py-[0.125em] px-[0.325em] w-[2.25em] text-center bg-[#ff4500]"></div>
              <div>Selected by Others</div>
            </div>
            <div className="sort-seats flex gap-5 mb-2">
              <div className="seat border-2 bg-[#e3bf00] border-[#061f77] py-[0.125em] px-[0.325em] w-[2.25em] text-center">
                S
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

export default OrdBusSeat;
