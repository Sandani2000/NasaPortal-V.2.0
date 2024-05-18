import React, { useState } from "react";
import { getRoverPhotosByEarthDate } from "../utils/RoverApiService";
import backgroundImage from "../images/Background8.jpg";

function RoverPhotosByEarthDate() {
  const [rover, setRover] = useState("curiosity");
  const [earthDate, setEarthDate] = useState("");
  const [camera, setCamera] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);

  const cameras = [
    { value: "fhaz", label: "Front Hazard Avoidance Camera" },
    { value: "rhaz", label: "Rear Hazard Avoidance Camera" },
    { value: "mast", label: "Mast Camera" },
    { value: "chemcam", label: "Chemistry and Camera Complex" },
    { value: "mahli", label: "Mars Hand Lens Imager" },
    { value: "mardi", label: "Mars Descent Imager" },
    { value: "navcam", label: "Navigation Camera" },
    { value: "pancam", label: "Panoramic Camera" },
    {
      value: "minites",
      label: "Miniature Thermal Emission Spectrometer (Mini-TES)",
    },
  ];

  const rovers = [
    { value: "curiosity", label: "Curiosity" },
    { value: "opportunity", label: "Opportunity" },
    { value: "spirit", label: "Spirit" },
  ];

  const handleFetchPhotos = async () => {
    try {
      setLoading(true);
      const data = await getRoverPhotosByEarthDate(
        rover,
        earthDate,
        camera || null,
        pages
      );
      setPhotos(data.photos);
      // addStyles();
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  // const addStyles = () => {
  //   const container = document.getElementById("container");
  //   if (container) {
  //     container.style.backgroundColor = "black"
  //   }
  // };

  return (
    <div className="container flex flex-col py-10 mx-auto max-w-auto">
      <div>
        <form className="items-center justify-center p-4 mx-auto bg-gray-100 rounded-lg shadow-xl md:w-2/4">
          <h2 className="mb-6 font-bold md:text-3xl">
            Fetch Rover Photos by Earth Date
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">Rover:</label>
              <select
                value={rover}
                onChange={(e) => setRover(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                {rovers.map((rover) => (
                  <option key={rover.value} value={rover.value}>
                    {rover.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Earth Date:</label>
              <input
                type="date"
                value={earthDate}
                onChange={(e) => setEarthDate(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">Camera:</label>
              <select
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Camera</option>
                {cameras.map((cam) => (
                  <option key={cam.value} value={cam.value}>
                    {cam.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Pages:</label>
              <input
                type="number"
                value={pages}
                min="1"
                onChange={(e) => setPages(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            onClick={handleFetchPhotos}
            disabled={!earthDate || loading}
            className="block w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            {loading ? "Loading..." : "Fetch Photos"}
          </button>
        </form>
      </div>

      {/* <div className="bg-gray-300 h-200px sectorFooter">hhh</div> */}

      <div className="grid grid-cols-1 gap-6 mx-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.img_src}
            alt="Mars Rover"
            className="object-cover w-full h-auto rounded-md"
          />
        ))}
      </div>
    </div>
  );
}

export default RoverPhotosByEarthDate;
