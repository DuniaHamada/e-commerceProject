import React, { useState } from "react";
import withWrapper from "../HOC/withWrapper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const CustomToast = () => (
      <div className="flex items-center">
        <CheckCircleIcon className="w-6 h-6 text-[#82817f] mr-2" />{" "}
        {/* Gray color */}
        <span className="text-[#82817f]">
          Thank you! Message sent successfully!
        </span>{" "}
        {/* Gray color */}
      </div>
    );

    toast(<CustomToast />, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "text-sm bg-white shadow-lg rounded-lg",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md poppins-medium">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name *"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email *"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone *"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          ></textarea>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-3 bg-rose-900 text-white font-semibold rounded-md hover:bg-rose-800 transition duration-200"
          >
            Send Message
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

const WrapperNavbar = withWrapper(ContactUs);
export default WrapperNavbar;
