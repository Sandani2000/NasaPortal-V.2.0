import React from "react";

const ContactUs = () => {
  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Contact Us</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="p-8 bg-white rounded shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Get in Touch</h2>
          <p className="text-gray-700">
            Have questions or feedback? We'd love to hear from you! Feel free
            to reach out using the contact form below.
          </p>
          <div className="mt-6">
            <h3 className="mb-2 text-xl font-semibold">Email</h3>
            <p className="text-gray-700">contact@spaceify.com</p>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 text-xl font-semibold">Phone</h3>
            <p className="text-gray-700">(011) 256-7890</p>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 text-xl font-semibold">Address</h3>
            <p className="text-gray-700">
              123 Universe Avenue, Cosmos City, Milky Way
            </p>
          </div>
        </div>
        <div className="p-8 bg-white rounded shadow-md">
          <form>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="message"
                rows="6"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div className="flex items-center justify-end">
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
