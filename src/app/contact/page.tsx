"use client";

import { useState } from "react";
import Heading from "@/components/Home/component/Heading";

<<<<<<< HEAD
const page = () => {
=======
const Page = () => {
>>>>>>> main
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert("Message sent successfully!");
  };

  return (
<<<<<<< HEAD
    <>
      <div className="my-5" style={{ backgroundImage: "url(/about.jpg)" }}>
        <div className="bg-blue-900 bg-opacity-60">
          <Heading title="Contact us" />
        </div>
      </div>
      <div className="w-full lg:w-2/3 mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
       
        <p className="text-center text-gray-600 mb-6">
=======
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      <div className="my-5" style={{ backgroundImage: "url(/about.jpg)" }}>
        <div className="bg-black bg-opacity-60">
          <Heading title="Contact us" />
        </div>
      </div>
      <div className="w-full lg:w-2/3 mx-auto p-6 bg-black shadow-md rounded-lg mt-10 border border-green-500">
        <p className="text-center text-gray-300 mb-6">
>>>>>>> main
          Have a question or need assistance? Fill out the form below and we’ll
          get back to you shortly.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
<<<<<<< HEAD
                className="block text-sm font-medium text-gray-700"
=======
                className="block text-sm font-medium text-gray-300"
>>>>>>> main
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
<<<<<<< HEAD
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
=======
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-black text-white"
                placeholder="Enter your name"
              />
            </div>
            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300"
>>>>>>> main
              >
                Address
              </label>
              <input
                type="text"
<<<<<<< HEAD
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
=======
                id="address"
                name="address"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-black text-white"
>>>>>>> main
                placeholder="Enter Address"
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
<<<<<<< HEAD
                className="block text-sm font-medium text-gray-700"
              >
                Email 
=======
                className="block text-sm font-medium text-gray-300"
              >
                Email
>>>>>>> main
              </label>
              <input
                type="email"
                id="email"
                name="email"
<<<<<<< HEAD
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
=======
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-black text-white"
>>>>>>> main
                placeholder="Enter your email"
              />
            </div>
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
<<<<<<< HEAD
                className="block text-sm font-medium text-gray-700"
=======
                className="block text-sm font-medium text-gray-300"
>>>>>>> main
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
<<<<<<< HEAD
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
=======
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-black text-white"
>>>>>>> main
                placeholder="Enter your phone number"
              />
            </div>
            {/* Message */}
            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="message"
<<<<<<< HEAD
                className="block text-sm font-medium text-gray-700"
=======
                className="block text-sm font-medium text-gray-300"
>>>>>>> main
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
<<<<<<< HEAD
                required
                rows={4}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
=======
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-black text-white"
>>>>>>> main
                placeholder="Write your message here"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
<<<<<<< HEAD
              className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
=======
              className="bg-green-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
>>>>>>> main
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
<<<<<<< HEAD
    </>
  );
};

export default page;
=======
    </div>
  );
};

export default Page;
>>>>>>> main
