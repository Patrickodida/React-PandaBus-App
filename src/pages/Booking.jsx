import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusService from "../components/BusService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import { userData } from "../UserHelper";
import SvgPeople from "../images/bookSeat.svg";

function Booking() {
  const user = userData();
  const navigate = useNavigate();

  //console.log("User Data: ", user);

  const [input, setInput] = useState({
    from: "Kampala",
    to: "",
  });

  const [error, setError] = useState({
    from: "",
    to: "",
  });

  const [filters, setFilters] = useState({
    busCategory: [],
    departureTime: [],
  });

  const [route, setRoute] = useState([]);
  const [filteredRoute, setFilteredRoute] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
      return;
    }

    const data = localStorage.getItem("ticketData");
    if (data) {
      const parsedData = JSON.parse(data);
    // Only update state if the parsed data is different from the current input
      if (parsedData.from !== input.from || parsedData.to !== input.to) {
      setInput(parsedData);
    }
    }

    fetchData();
  }, [user.token, navigate, input.from, input.to]);

  const fetchData = async () => {
    try {
      let busRoutesResponse = await fetch(
        "http://localhost:6500/api/v1/busRoutes"
      );
      let busServicesResponse = await fetch(
        "http://localhost:6500/api/v1/busServices"
      );

      let busRoutesData = await busRoutesResponse.json();
      let busServicesData = await busServicesResponse.json();

      // Combine the bus routes with bus services by busId
      const combinedRoutes = busRoutesData.map((route) => {
        const busService = busServicesData.find(
          (service) => service.busId === route.routeId
        );
        return {
          ...route,
          busCompany: busService ? busService.name : "Unknown Bus Company",
        };
      });

      setRoute(combinedRoutes);
      setFilteredRoute(combinedRoutes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let filtered = route;

    if (input.from) {
      filtered = filtered.filter((item) =>
        item.departureTown.toLowerCase().includes(input.from.toLowerCase())
      );
    }

    if (input.to) {
      filtered = filtered.filter((item) =>
        item.arrivalTown.toLowerCase().includes(input.to.toLowerCase())
      );
    }

    setFilteredRoute(filtered);

    if (filtered.length === 0) {
      setError({ from: "", to: "No routes available for this selection." });
    } else {
      setError({ from: "", to: "" });
    }
  };

  return (
    <div>
      <Navbar />
      <Banner title={"Book Your Bus"} />
      <div className="mt-2 mb-2 w-[80%] m-auto">
        <section className="BookingArea-section">
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg">
              <div className="form-row flex flex-col md:flex-row gap-2 justify-center w-full">
                <div className="from flex">
                  <label
                    className="text-[#061f77] text-center font-bold"
                    id="firstLabel"
                  >
                    From:
                  </label>
                  <select
                    id="from"
                    value={input.from}
                    className="mb-[24px] text-[#061f77] rounded w-full md:w-auto  p-[0.325em] border border-gray-300 text-[#061f77] focus:outline-none"
                    onChange={(e) =>
                      setInput({ ...input, from: e.target.value })
                    }
                  >
                    <option value="">Select Location</option>
                    <option value="Kampala">Kampala</option>
                    <option value="Kabale">Kabale</option>
                    <option value="Soroti">Soroti</option>
                    <option value="Arua">Arua</option>
                    <option value="Gulu">Gulu</option>
                    <option value="Mbale">Mbale</option>
                    <option value="Kitgum">Kitgum</option>
                    <option value="Mbarara">Mbarara</option>
                  </select>
                </div>
                {error.from && (
                  <p className="text-center text-red-500">{error.from}</p>
                )}
                <div className="to flex">
                  <label className="text-[#061f77] font-bold">To:</label>
                  <select
                    id="to"
                    value={input.to}
                    className="mb-[24px] text-[#061f77] rounded w-full md:w-auto p-[0.325em] border border-gray-300 text-[#061f77] focus:outline-none"
                    onChange={(e) => setInput({ ...input, to: e.target.value })}
                  >
                    <option value="">Select Destination</option>
                    <option value="Mbarara">Mbarara</option>
                    <option value="Kitgum">Kitgum</option>
                    <option value="Mbale">Mbale</option>
                    <option value="Gulu">Gulu</option>
                    <option value="Arua">Arua</option>
                    <option value="Soroti">Soroti</option>
                    <option value="Kabale">Kabale</option>
                    <option value="Kampala">Kampala</option>
                  </select>
                </div>
                {error.to && (
                  <p className="text-center text-red-500">{error.to}</p>
                )}
                <div className="ticket flex">
                  <button
                    type="submit"
                    className="m-0 md:ml-4 md:mb-[24px] bg-[#061f77] rounded-lg text-white py-2 px-10 text-center w-full md:w-[50%]"
                    style={{ whiteSpace: "nowrap", width: "100%" }}
                  >
                    Find Ticket
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <div className="md:flex md:justify-center items-start flex-col md:flex-row">
          <section className="bg-slate-100 text-[#061f77] rounded-lg p-4 md:mr-10 md:mb-20 mt-20 mb-10 text-center w-20% md:mt-0">
            <div className="flex mb-8 justify-center">
              <div className="font-bold">
                <h1>FILTER</h1>
              </div>
              <div className="pl-8 font-bold">
                <h2
                  className="cursor-pointer"
                  onClick={() =>
                    setFilters({ busCategory: [], departureTime: [] })
                  }
                >
                  Reset All
                </h2>
              </div>
            </div>
            <div>
              <h2 className="mb-4 font-bold">Bus Service</h2>
              <div>
                <div>
                  <input
                    className="mb-4"
                    type="checkbox"
                    onChange={(e) =>
                      handleFilterChange("busCategory", "Nile Star Bus")
                    }
                  />
                  <label>Nile Star</label>
                </div>
                <div>
                  <input
                    className="mb-4"
                    type="checkbox"
                    onChange={(e) =>
                      handleFilterChange("busCategory", "Global Bus")
                    }
                  />
                  <label>Global</label>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-4 mt-8 font-bold">Departure Time</h2>
              <div>
                <div className="mb-2">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleFilterChange("departureTime", "08:00 AM")
                    }
                  />
                  <label>08:00 AM</label>
                </div>
                <div className="mb-2">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleFilterChange("departureTime", "09:00 AM")
                    }
                  />
                  <label>09:00 AM</label>
                </div>
              </div>
            </div>
          </section>
          <div>
            {loading ? (
              <div className="image md:w-100 w-full h-auto flex justify-center border-2 rounded-lg p-4 shadow:md order-1 md:order-2">
                <img src={SvgPeople} className="" />
              </div>
            ) : (
              <div>
                {filteredRoute.length === 0 ? (
                  <p>No buses available for this route.</p>
                ) : (
                  filteredRoute.map((bus) => (
                    <BusService
                      key={bus.routeId}
                      busCompany={bus.busCompany}
                      departureTown={bus.departureTown}
                      arrivalTown={bus.arrivalTown}
                      departureTime={new Date(
                        bus.departureTime
                      ).toLocaleString()}
                      fare={bus.fare}
                      id={bus.routeId}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Booking;
