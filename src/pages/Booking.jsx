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

  console.log("User Data: ", user);

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
    if (!user.token) { // Changed to check for 'token' instead of 'jwt'
      navigate("/login");
      return;
    }

    const data = localStorage.getItem("ticketData");
    if (data) {
      setInput(JSON.parse(data));
    }

    fetchData();
  }, [user.token, navigate]); // Changed from user.jwt to user.token

  function fetchData() {
    fetch("http://localhost:6500/api/v1/busRoutes?populate=*")
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

    if (filtered.length === 0) {
      setError({ from: "", to: "No routes available for this selection." });
    } else {
      setError({ from: "", to: "" });
    }
  };

  return (
    <div>
      <Navbar />
      <Banner />
      <section className="flex flex-col md:flex-row justify-around items-center md:justify-center p-8 mt-4">
        <div className="md:w-[50%] p-4 border rounded-md">
          <h2 className="text-2xl font-bold text-[#061f77] mb-4">Search for a Bus</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-lg font-medium">From:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded mt-2"
                value={input.from}
                onChange={(e) => setInput({ ...input, from: e.target.value })}
              />
              <label className="text-lg font-medium mt-4">To:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded mt-2"
                value={input.to}
                onChange={(e) => setInput({ ...input, to: e.target.value })}
              />
              {error.to && <p className="text-red-500">{error.to}</p>}
            </div>
            <button
              type="submit"
              className="mt-4 bg-[#061f77] text-white py-2 px-4 rounded"
            >
              Search
            </button>
          </form>
        </div>
        <div className="md:w-[50%]">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-[#061f77] mb-4">Available Buses</h2>
              {filteredRoute.length === 0 ? (
                <p>No buses available for this route.</p>
              ) : (
                filteredRoute.map((bus) => (
                  <BusService key={bus.id} bus={bus} />
                ))
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Booking;
