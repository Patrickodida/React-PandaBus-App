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

  if (!user.jwt) {
    navigate("/login");
  }

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
    const data = localStorage.getItem("ticketData");
    if (data) {
      setInput(JSON.parse(data));
    }

    fetchData();
  }, []);

  function fetchData() {
    fetch("http://localhost:1337/api/bus-routes?populate=*")
      .then((response) => response.json())
      .then((dataObject) => {
        let routeData = dataObject.data;
        setRoute(routeData);
        setFilteredRoute(routeData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let filtered = route;

    if (input.from) {
      filtered = filtered.filter((item) =>
        item.attributes.DepartureTown.toLowerCase().includes(
          input.from.toLowerCase()
        )
      );
    }

    if (input.to) {
      filtered = filtered.filter((item) =>
        item.attributes.ArrivalTown.toLowerCase().includes(
          input.to.toLowerCase()
        )
      );
    }

    setFilteredRoute(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];

      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  useEffect(() => {
    let filtered = route;

    if (filters.busCategory.length > 0) {
      filtered = filtered.filter((item) =>
        filters.busCategory.includes(item.attributes.bus_services.data[0].attributes.Name)
      );
    }

    if (filters.departureTime.length > 0) {
      filtered = filtered.filter((item) => {
        const departureTime = item.attributes.DepartureTime.split(":");
        const formattedTime = `${departureTime[0]}:00 ${
          departureTime[0] >= 12 ? "PM" : "AM"
        }`;
        return filters.departureTime.includes(formattedTime);
      });
    }

    setFilteredRoute(filtered);
  }, [filters, route]);

  return (
    <div>
      <Navbar />
      <Banner title={"Book Your Bus"} />
      <div className="mt-2 mb-2 w-[80%] m-auto">
        <section className="BookingArea-section">
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg"
            >
              <div className="form-row flex flex-col md:flex-row gap-2 justify-center w-full">
                <div className="from flex">
                  <label className="text-[#061f77] text-center font-bold" id="firstLabel">
                    From
                  </label>
                  <select
                    id="from"
                    value={input.from}
                    className="mb-[24px] text-[#061f77] rounded w-full md:w-auto  p-[0.325em] border border-gray-300 text-[#061f77] focus:outline-none"
                    onChange={(e) => setInput({ ...input, from: e.target.value })}
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
                  <label className="text-[#061f77] font-bold">To</label>
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
            ) : filteredRoute.length > 0 ? (
              filteredRoute.map((row) => (
                <BusService
                  className=""
                  key={row.id}
                  id={row.id}
                  busCompany={row.attributes.bus_services.data[0].attributes.Name}
                  departureTown={row.attributes.DepartureTown}
                  arrivalTown={row.attributes.ArrivalTown}
                  departureTime={row.attributes.DepartureTime}
                  fare={row.attributes.Fare}
                />
              ))
            ) : (
              <p>No Buses available ...</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Booking;
