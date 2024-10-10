import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [input, setInput] = useState({
    from: "",
    to: "",
  });
  const [error, setError] = useState({
    from: "",
    to: "",
  });
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const navigate = useNavigate();

  function handleTicketSubmission(e) {
    e.preventDefault();
    if (!input.from || !input.to) {
      setError({
        from: !input.from ? "Please select a location from the list" : "",
        to: !input.to ? "Please select a location from the list" : "",
      });
      return;
    }
    localStorage.setItem("ticketData", JSON.stringify(input));
    navigate("/booking");
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = () => {
    setTimeout(() => {
      const fetchedFromOptions = [
        "Kampala",
        "Kabale",
        "Soroti",
        "Arua",
        "Gulu",
        "Mbale",
        "Kitgum",
        "Mbarara",
      ];
      const fetchedToOptions = [
        "Mbarara",
        "Kitgum",
        "Mbale",
        "Gulu",
        "Arua",
        "Soroti",
        "Kabale",
        "Kampala",
      ];

      setFrom(fetchedFromOptions);
      setTo(fetchedToOptions);
    }, 1000);
  };

  return (
    <div>
      <section id="home" className="hero-section mt-20 md:pt-10">
        <div className="hero-over-lay"></div>
        <div className="hero-content justify-center gap-10 w-4/5 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center">
          <div className="hero-text w-full md:w-2/4 font-bold leading-tight text-3xl lg:text-5xl lg:text-left text-center">
            <h1>Get Your Ticket Online Easy and Safely</h1>
          </div>
          <div className="hero-form w-full lg:w-2/4">
            <h2 className="lg:text-left text-center pb-2.5 font-bold">
              Choose Your Ticket
            </h2>
            <form
              onSubmit={handleTicketSubmission}
              className="p-5 form-center bg-white rounded-lg"
            >
              <div className="form-row sm:w-full">
                <select
                  id="from"
                  className="mb-[24px] mr-4 text-blue-900 rounded w-[50%] p-[0.425em] border border-gray-300 text-[#061f77] focus:outline-none"
                  onChange={(e) => setInput({ ...input, from: e.target.value })}
                  value={input.from}
                >
                  <option value="">Select From</option>
                  {from.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                {error.from && (
                  <p className="text-center text-red-500">{error.from}</p>
                )}
                <select
                  id="to"
                  className="mb-[24px] text-blue-900 rounded w-[50%] p-[0.425em] border border-gray-300 text-[#061f77] focus:outline-none"
                  onChange={(e) => setInput({ ...input, to: e.target.value })}
                  value={input.to}
                >
                  <option value="">Select To</option>
                  {to.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                {error.to && (
                  <p className="text-center text-red-500 w-full">{error.to}</p>
                )}
              </div>
              <button type="submit" className="bg-blue-900 rounded-lg">
                Find Ticket
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
