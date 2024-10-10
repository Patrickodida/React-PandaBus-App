import React, { useState } from "react";
import { init, send } from "emailjs-com";
import validator from "validator";

init("D_HsXt0xCiDMgz_yg");

function Contact() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState("");

  // Validate name
  function validateName(name) {
    if (!name.trim()) {
      setError((prevError) => ({ ...prevError, name: "Please enter your name" }));
      return false;
    }
    const nameFormat = /^[a-zA-Z\s]*$/;
    if (!nameFormat.test(name)) {
      setError((prevError) => ({ ...prevError, name: "Please enter a valid name" }));
      return false;
    }
    setError((prevError) => ({ ...prevError, name: "" }));
    return true;
  }

  // Validate email
  function validateEmail(email) {
    if (!validator.isEmail(email)) {
      setError((prevError) => ({ ...prevError, email: "Invalid email" }));
      return false;
    }
    setError((prevError) => ({ ...prevError, email: "" }));
    return true;
  }

  // Validate message
  function validateMessage(message) {
    if (!message.trim()) {
      setError((prevError) => ({ ...prevError, message: "Please enter the message" }));
      return false;
    }
    setError((prevError) => ({ ...prevError, message: "" }));
    return true;
  }

  function handleSendMessage(e) {
    e.preventDefault();
    const isNameValid = validateName(input.name);
    const isEmailValid = validateEmail(input.email);
    const isMessageValid = validateMessage(input.message);

    if (isNameValid && isEmailValid && isMessageValid) {
      const templateParams = {
        name: input.name,
        email: input.email,
        message: input.message,
      };

      send("service_wti52bb", "template_mbekayk", templateParams)
        .then((response) => {
          console.log("Email successfully sent!", response.status, response.text);
          setSuccess("Message sent successfully!");
          setInput({ name: "", email: "", message: "" });
        })
        .catch((err) => {
          console.error("Failed to send email. Error: ", err);
          setError((prevError) => ({ ...prevError, message: "Message not sent, Try Again" }));
        });
    }
  }

  return (
    <div>
      <section id="contact" className="contact-section w-[80%] m-auto pt-20">
        <h2 className="text-4xl text-center mb-6 font-bold">Contact Us</h2>
        <div className="contact-container text-center md:flex md:justify-around md:items-center md:gap-10">
          <div className="form-section w-full mb-[3em] md:w-[50%]">
            <h3 className="mb-[24px] font-bold text-center md:text-left">Get In Touch</h3>
            <form onSubmit={handleSendMessage} className="contact-form">
              <input
                className="w-full text-[#061f77] rounded p-[0.425em] mb-[24px] border border-gray-400 focus:outline-none "
                type="text"
                id="name"
                placeholder="Your Name"
                onChange={(e) => {
                  setInput({ ...input, name: e.target.value });
                }}
                value={input.name}
              />
              {error.name && <p className="text-red-500">{error.name}</p>}
              <input
                className="w-full text-[#061f77] rounded p-[0.425em] mb-[24px] border border-gray-400 focus:outline-none"
                type="text"
                id="email"
                placeholder="Your Email"
                onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
                  validateEmail(e.target.value);
                }}
                value={input.email}
              />
              {error.email && <p className="text-red-500">{error.email}</p>}
              <textarea
                id="message"
                type="message"
                rows="6"
                cols="50"
                className="w-full rounded p-[0.425em] mb-[24px] border border-gray-400 text-[#061f77] focus:outline-none placeholder:text-[#061f77]"
                placeholder="Your Message"
                onChange={(e) => {
                  setInput({ ...input, message: e.target.value });
                }}
                value={input.message}
              ></textarea>
              <button className="w-full rounded">Send</button>
              {error.message && <p className="text-red-500">{error.message}</p>}
              {success && <p className="text-green-500">{success}</p>}
            </form>
          </div>

          <div className="address md:text-left text-center">
            <div className="location">
              <h3 className="mb-[24px] font-bold">Our Location</h3>
              <address>
                KwataBus Headquarters <br />
                123 Traveler's Avenue <br />
                City Center, Metroville <br />
                Uganda
              </address>
            </div>
            <div>
              <h3 className="font-bold my-4">Contact Numbers</h3>
              <p>
                <strong>Phone:</strong> +256 123 456789
              </p>
            </div>
            <div className="emails">
              <p>
                <strong>Email:</strong> business@kwatabus.com
              </p>
            </div>
            <div className="hours">
              <strong>Hours:</strong> Monday to Friday, 8:00 AM - 5:00 PM (EAT)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
