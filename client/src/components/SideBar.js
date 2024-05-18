import React from "react";
import { Link } from "react-router-dom";
import BulletIcon from "../images/BulletIcon2.png";
import SolarIcon from "../images/solarIcon.png";
import NextIcon from "../images/NextIcon.png";

const Sidebar = () => {
  return (
    <div className="w-full h-screen p-4 text-black bg-gray-100 md:w-1/4">
      <ul className="space-y-4">
        <Link to="/apod" className="flex flex-row items-center justify-start px-4 py-2 hover:bg-gray-600 hover:border-blue-950 hover:text-white hover:rounded ">
          <img src={NextIcon} className="w-8 h-6" />
          <li className="ml-3 cursor-pointer">APOD</li>
        </Link>

        <Link to="/history2" className="flex flex-row items-center justify-start px-4 py-2 hover:bg-gray-600 hover:border-blue-950 hover:text-white hover:rounded ">
          <img src={NextIcon} className="w-8 h-6" />
          <li className="ml-3 cursor-pointer">APOD History</li>
        </Link>
        
        <Link to="/random-apod" className="flex flex-row items-center justify-start px-4 py-2 hover:bg-gray-600 hover:border-blue-950 hover:text-white hover:rounded ">
          <img src={NextIcon} className="w-8 h-6" />
          <li className="ml-3 cursor-pointer">Random APOD</li>
        </Link>
        
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <Link to="/" className="flex flex-row items-center justify-start px-4 py-2 hover:bg-gray-600 hover:border-blue-950 hover:text-white hover:rounded">
          <img src={NextIcon} className="w-8 h-6" />
          <li className="ml-3 cursor-pointer">Back</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
