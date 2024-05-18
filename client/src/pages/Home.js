import React from "react";

import Hero from "../videos/Hero2.mp4";
import Landing2 from "../images/Landing2.png";
import Landing3 from "../images/Background9.jpg";
import NavHome from "../components/NavHome";

const Home = () => {
  const scrollToMission = () => {
    const missionSection = document.getElementById("missionSection");
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToHorizontalLanding = () => {
    const horizontalLandingSection = document.getElementById(
      "horizontalLandingSection"
    );
    if (horizontalLandingSection) {
      horizontalLandingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateAPOD = () => {
    window.location.href = "/apod";
  };

  const navigateMarsRover = () => {
    window.location.href = "/roverPhotosBySol";
  };

  const navigateLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          src={Hero}
        />
      </div>
      <header className="absolute z-10 flex flex-col items-end justify-end px-8 py-6 right-5 md:right-20 top-10 md:top-52">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Beyond Earth,
            <br />
            <span className="text-4xl md:text-6xl">Explore the Cosmos</span>
          </h1>
          <br />
          <p className="text-2xl text-gray-200 md:text-xl">
            "Unveiling the Universe, One Image at a Time"
          </p>
          <br />
          <button
            onClick={navigateLogin}
            className="px-10 py-3 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-900"
          >
            Get Started
          </button>
        </div>
      </header>
      <div className="flex items-center justify-center h-screen bg-gray-200">
        {/* <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">About Us</h2>
        </div> */}
      </div>
      <div
        id="missionSection"
        className="flex flex-col items-start justify-center h-screen bg-center bg-cover"
        style={{
          backgroundImage: `url(${Landing2})`, // Change the path to your image
        }}
      >
        <div className="flex flex-col items-start justify-end w-screen h-full pb-10 pl-10 md:pl-28">
          <h1 className="text-6xl font-bold text-white md:text-8xl">
            Discover
            <br />
            <span className="text-6xl md:text-8xl">Deep Space</span>
          </h1>
        </div>

        <div className="flex items-center justify-center w-full h-full pb-10">
          <div className="flex flex-col gap-4 md:gap-28 md:flex-row">
            <div
              className="flex items-center justify-center h-16 text-2xl font-bold cursor-pointer md:text-3xl rounded-xl w-80 md:w-96 md:h-28"
              onClick={navigateAPOD}
              style={{
                backgroundColor: "#d5d6db",
                color: "#1b1d26",
              }}
            >
              Explore APOD
            </div>
            <div
              className="flex items-center justify-center h-16 text-2xl font-bold cursor-pointer md:text-3xl rounded-xl w-80 md:w-96 md:h-28"
              onClick={navigateMarsRover}
              style={{
                backgroundColor: "#d5d6db",
                color: "#1b1d26",
              }}
            >
              Explore Mars Rover
            </div>
            {/* <div
              className="flex items-center justify-center h-16 text-2xl font-bold cursor-pointer md:text-3xl rounded-xl w-80 md:w-80 md:h-60"
              onClick={scrollToHorizontalLanding}
              style={{
                backgroundColor: "#d5d6db",
                color: "#1b1d26",
              }}
            >
              Explore Earth Imagery
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
