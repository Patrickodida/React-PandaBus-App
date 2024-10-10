import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-section lg:flex lg:justify-around bg-[#061f77] text-white mt-20 pt-5 pb-5">
      <section id="companyLogoMedia" className="p-8 lg:flex lg:items-center">
        <div className="flex flex-col items-center">
          <Link to="/">
            <h3 className="text-xl font-bold mb-2">
              Kwata<span style={{ color: "#e3bf00" }}>Bus</span>
            </h3>
          </Link>

          <ul className="flex justify-around">
            <li>
              <i className="bx bxl-facebook-circle text-2xl social-icons"></i>
            </li>
            <li>
              <i className="bx bxl-twitter text-2xl social-icons pl-4"></i>
            </li>
            <li>
              <i className="bx bxl-linkedin-square text-2xl social-icons pl-4"></i>
            </li>
          </ul>
        </div>
      </section>
      <section id="usefulLinks" className="p-8 text-center">
        <h4 id="h4" className="text-xl font-medium">
          Useful Links
        </h4>
        <div className="footer-links-primary text-center">
          <ul>
            <li>
              <Link to="/" className="footer-links">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-links">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-links">
                Contact
              </Link>
            </li>
          </ul>
          <div className="copyright mt-6">
            <p>© KwataBus {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>
      <section id="contact" className="p-8 text-center lg:text-right">
        <h4 className="text-xl font-medium">Contact Info</h4>
        <p>Plot 155, Dembe Towers</p>
        <p>+256393280823</p>
        <p>info@kwatabus.com</p>
      </section>
    </div>
  );
}

export default Footer;
