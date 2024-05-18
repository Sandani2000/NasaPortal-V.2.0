import React from "react";
import Hero from "../videos/Hero2.mp4";
import Landing2 from "../images/Landing2.png";
import "../stylesheets/Landing.css";
import NavBar from "../components/NavBar";

const LandingPage = () => {
  const navigateAPOD = () => {
    window.location.href = "/apod";
    // navigate("/apod");
  };

  const navigateMarsRover = () => {
    window.location.href = "/roverPhotosBySol";
  };
  return (
    <div className="relative h-screen">
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

export default LandingPage;
