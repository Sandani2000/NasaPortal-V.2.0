import React, { useState } from "react";
import { Link } from "react-router-dom";
import NasaLogo from "../images/NasaLogo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900">
      <div className="px-1 py-3 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={NasaLogo} alt="Logo" className="h-16 mr-2" />
            <Link to="/" className="text-lg font-semibold text-white">
              Spaceify
            </Link>
          </div>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          <div className="justify-end flex-grow hidden lg:flex">
            <Link
              to="/explore"
              className="px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-800"
            >
              Features
            </Link>
            <Link
              to="/apod"
              className="px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-800"
            >
              Picture of the Day
            </Link>
            <Link
              to="/random"
              className="px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-800"
            >
              Random APODs
            </Link>

            <Link
              to="/history"
              className="px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-800"
            >
              Past APODs
            </Link>

            <Link
              to="/roverPhotosBySol"
              className="px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-800"
            >
              Mars Rover By Sol
            </Link>

            {/* <Link
              to="/roverPhotosByEarthDate"
              className="px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-800"
            >
              Mars Rover By Earth Date
            </Link> */}
            <Link
              to="/"
              className="px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-800"
            >
              Logout
            </Link>

            {/* <Link
              to="/"
              className="px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-800"
            >
              Logout
            </Link> */}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray-800 lg:hidden">
          <Link
            to="/"
            className="block px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/apod"
            className="block px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-700"
          >
            APOD
          </Link>
          <Link
            to="/roverPhotosBySol"
            className="block px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-700"
          >
            Mars Rover
          </Link>
          <Link
            to="/history"
            className="block px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-700"
          >
            History
          </Link>

          <Link
            to="/contact"
            className="block px-4 py-2 text-lg font-medium text-white rounded-md hover:bg-gray-700"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
