import React from "react";
import { useNavigate } from "react-router-dom";

function BusService(props) {
  const navigate = useNavigate();

  const handleSelectSeat = () => {
    navigate(`/select-seat/${ props.id }`, {
      state: {
        busCompany: props.busCompany,
        departureTown: props.departureTown,
        arrivalTown: props.arrivalTown,
        departureTime: props.departureTime,
        fare: props.fare,
      },
    });
  };
  return (
    <div className="m-auto w-full text-[#061f77] mb-10">
      <section className="flex md:justify-center flex-col md:flex-row bg-slate-100 p-4 rounded-lg text-center">
        <div className="text-center md:text-left">
          <h1 className="mb-4 font-bold">{props.busCompany}</h1>
          <p className="mb-4">
            <span className="font-bold">From</span> {props.departureTown}{" "}
            <span className="font-bold">To</span> {props.arrivalTown}
          </p>
        </div>

        <div className="md:flex md:justify-center flex-col md:flex-row md:items-end">
          <p className="md:ml-8 mb-4">Departure time: {props.departureTime}</p>
          <p className="md:ml-8 mb-4">Cost: {props.fare}</p>
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