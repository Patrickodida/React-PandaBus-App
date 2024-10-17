import React from "react";
import { useNavigate } from "react-router-dom";

function BusService({ id, busCompany, departureTown, arrivalTown, departureTime, fare }) {
  const navigate = useNavigate();

  const handleSelectSeat = () => {
    navigate(`/select-seat/${id}`, {
      state: {
        busCompany,
        departureTown,
        arrivalTown,
        departureTime,
        fare,
      },
    });
  };
  return (
    <div className="m-auto w-full text-[#061f77] mb-10">
      <section className="flex md:justify-center flex-col md:flex-row bg-slate-100 p-4 rounded-lg text-center">
        <div className="text-center md:text-left">
          <h1 className="mb-4 font-bold">{busCompany}</h1>
          <p className="mb-4">
            <span className="font-bold">From</span> {departureTown}{" "}
            <span className="font-bold">To</span> {arrivalTown}
          </p>
        </div>

        <div className="md:flex md:justify-center flex-col md:flex-row md:items-end">
          <p className="md:ml-8 mb-4">Departure time: {departureTime}</p>
          <p className="md:ml-8 mb-4">Cost: {fare}</p>
          <div className="button flex justify-center w-full md:w-[50%]">
          <button
            onClick={handleSelectSeat}
            className="md:ml-8 md:mb-4 bg-[#061f77] rounded-lg text-white py-2 px-10 text-center w-full "
            style={{ whiteSpace: "nowrap" }}
          >
            Select Seat
          </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BusService;