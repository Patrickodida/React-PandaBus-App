import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import axios from "axios";
import { userData } from "../UserHelper";

function OrdBusSeat() {
  const { id } = useParams(); // Get the bus route id
  const navigate = useNavigate();
  const [busRoute, setBusRoute] = useState(null); // Store bus route data
  const [busService, setBusService] = useState(null); // Store bus service data
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedByOthersSeats, setSelectedByOthersSeats] = useState([]);
  const [journeyDate, setJourneyDate] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  
  const user = userData();
  if (!user.token) {
    navigate("/login");
  }

  // Fetch bus route details
  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const routeResponse = await axios.get(
          `http://localhost:6500/api/v1/busRoutes/${id}`
        );
        setBusRoute(routeResponse.data); // Set bus route data
        const serviceResponse = await axios.get(
          `http://localhost:6500/api/v1/busServices`
        );
        const matchingService = serviceResponse.data.find(
          (service) => service.busId === routeResponse.data.busId
        );
        setBusService(matchingService); // Set the matching bus service data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bus data:", error);
        setLoading(false);
      }
    };

    fetchBusData();
  }, [id]);

  // Fetch seat availability once the journey date is set
  useEffect(() => {
  const fetchSeatAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6500/api/v1/busRoutes/${id}`
      );
      const seats = response.data.seats;
      const bookedSeats = seats
        .filter((seat) => seat.booked)
        .map((seat) => seat.seatNumber);
      const selectedByOthersSeats = seats
        .filter((seat) => seat.selectedByOthers)
        .map((seat) => seat.seatNumber);

      setBookedSeats(bookedSeats);
      setSelectedByOthersSeats(selectedByOthersSeats);
    } catch (error) {
      console.error("Error fetching seat availability:", error);
    }
  };

  if (journeyDate) {
    fetchSeatAvailability();
  }
}, [id, journeyDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!busRoute || !busService) {
    return <div>Error loading bus data</div>;
  }

  // Handle seat selection
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
      from: busRoute.departureTown,
      to: busRoute.arrivalTown,
      busCategory: busService.name,
      selectedSeats,
      user,
      price: busRoute.fare,
    };

    const selectedSeatIds = busRoute.seats
      .filter((seat) => selectedSeats.includes(seat.seatNumber))
      .map((seat) => seat.seatId);

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
      .put(`http://localhost:6500/api/v1/busRoutes/${id}`, updateData)
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
          ? "bg-[#ff4500]"
          : seatNumber === "S" || seatNumber === "Driver"
          ? "bg-[#e3bf00]"
          : ""
      } ${!bookedSeats.includes(seatNumber) &&
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
              <label htmlFor="date" className="m-[0]">
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
              <label htmlFor="from">From</label>
              <input
                type="text"
                id="from"
                value={busRoute.departureTown}
                readOnly
                className="rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              />
            </div>
            <div className="relative flex flex-col flex-start mb-4">
              <label htmlFor="to">To</label>
              <input
                type="text"
                id="to"
                value={busRoute.arrivalTown}
                readOnly
                className="rounded p-2 mt-4 placeholder-[#061f77] border border-gray-300 text-[#061f77] focus:outline-none"
              />
            </div>
            <div className="relative flex flex-col flex-start mb-4">
              <label htmlFor="busCategory">Bus Service</label>
              <input
                type="text"
                id="busCategory"
                value={busService.name}
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
          <div className="seat-grid flex flex-wrap justify-center items-center gap-[0.25em]">
            {busRoute.seats.map((seat, index) =>
              renderSeat(seat.seatNumber, index)
            )}
          </div>
          <div className="seating-instructions text-center mt-4 text-sm text-gray-500">
            <div className="seat-info">
              <span className="seat bg-[#069306] text-xs">Selected Seat</span>
              <span className="seat bg-gray-500 text-xs">Booked Seat</span>
              <span className="seat bg-[#ff4500] text-xs">
                Selected by Others
              </span>
              <span className="seat bg-[#e3bf00] text-xs">Special Seat</span>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default OrdBusSeat;