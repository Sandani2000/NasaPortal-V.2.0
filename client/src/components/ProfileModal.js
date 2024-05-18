import React from "react";
import UserImage from "../images/User.png";

const ProfileModal = () => {
  return (
    <div className="absolute z-10 p-4 bg-white rounded-md shadow-md top-16 right-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">User Profile</h3>
        <button className="text-red-500 hover:text-red-700 focus:outline-none">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <img src={UserImage} alt="User" className="w-16 h-16 rounded-full" />
        <div>
          <p className="font-semibold">John Doe</p>
          <p className="text-gray-500">john.doe@example.com</p>
        </div>
      </div>
      <button className="block w-full py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">
        Logout
      </button>
    </div>
  );
};

export default ProfileModal;
