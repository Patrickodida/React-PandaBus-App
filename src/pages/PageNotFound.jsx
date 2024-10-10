import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <section className="py-[5em] w-[80%] m-auto text-center ">
        <div className="">
            <h1 className="text-[8rem] text-[#061f77] font-bold">Oops!</h1>
          <h2 className="text-[2.5rem] mb-4">404 - Page Not Found</h2>
          <p className="text-[0.875rem] max-w-md m-auto mb-4 ">
            The page you are looking for might have been removed, had it's name
            changed or its temporarily unavailable
          </p>
        </div>
        <div className="text-[white] bg-[#061f77] w-[25%] flex justify-center m-auto py-4 rounded-[4em]">
          <Link to="/">Go To Home Page</Link>
        </div>
      </section>
    </div>
  );
}

export default PageNotFound;
