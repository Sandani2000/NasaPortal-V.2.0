import React, { useState, useEffect } from "react";
import { fetchRandomApodData } from "../utils/apodApiService";
import Hero from "../videos/Hero2.mp4";
import Landing3 from "../images/Background9.jpg";

const Random2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomCount, setRandomCount] = useState(5); // Initial random count
  const [apodData, setApodData] = useState([]);
  const [error, setError] = useState("");
  const [selectedApod, setSelectedApod] = useState(null);

  // Fetch data when randomCount changes
  useEffect(() => {
    fetchData();
  }, [randomCount]);

  const fetchData = async () => {
    try {
      const data = await fetchRandomApodData(randomCount);
      setApodData(data);
    } catch (error) {
      setError("Error fetching data");
    }
  };

  const handleReadMore = (apod) => {
    setSelectedApod(apod);
    setIsModalOpen(true); // Set the modal to open
  };

  const handleCloseModal = () => {
    setSelectedApod(null);
    setIsModalOpen(false); // Set the modal to close
  };

  const handleRandomCountChange = (e) => {
    const count = parseInt(e.target.value);
    setRandomCount(count);
  };

  const scrollToMission = () => {
    const missionSection = document.getElementById("missionSection");
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: "smooth" });
    }
    fetchData();
  };

  return (
    <div className="relative h-screen">
      <div
        id="heroSection"
        className="absolute inset-0 z-0 bg-cover"
        style={{
          backgroundImage: `url(${Landing3})`,
        }}
      />
      <div className="absolute z-10 flex flex-col items-center justify-center w-full px-8 py-16 mt-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Every image, a journey.
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center px-20 mt-10 bg-white bg-opacity-50 rounded-lg md:p-2">
          <form
            className="flex flex-col items-center justify-center gap-3 mb-4 md:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              fetchData();
            }}
          >
            <label htmlFor="randomCount" className="mr-2">
              Random Count:
            </label>
            <input
              type="number"
              id="randomCount"
              value={randomCount}
              onChange={handleRandomCountChange}
              className="px-2 py-1 border border-gray-400 rounded-md"
            />

            <button
              onClick={scrollToMission}
              className="px-8 py-1 font-semibold text-white bg-gray-800 rounded-full text-md hover:bg-blue-900"
            >
              Generate
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center h-screen bg-gray-200" />

      {/*--------------- Mission Section ------------*/}
      <div
        id="missionSection"
        className="flex flex-col items-start justify-center bg-gray-900 bg-center bg-cover"
      >
        <div className="flex flex-col w-screen h-full px-8 pt-8 pb-10 md:px-8">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Explore the Universe's Captivating Past with APODs
          </h1>

          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 gap-4 px-20 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {apodData.map((item, index) => (
              <div
                key={index}
                className="relative p-4 bg-white border border-gray-300 rounded-md"
              >
                <h2 className="mb-2 text-xl font-semibold">{item.title}</h2>
                <p className="mb-2 text-gray-600">{item.date}</p>
                <img
                  src={item.url}
                  alt={item.title}
                  className="object-cover w-full h-auto mb-2 rounded-md max-h-40"
                />
                <p className="mb-2 text-gray-700">
                  {item.explanation.slice(0, 100)}...
                </p>
                <button
                  onClick={() => handleReadMore(item)}
                  className="absolute px-2 py-1 text-white bg-blue-500 rounded-md bottom-4 left-4 right-4"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && selectedApod && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
          <div className="relative max-w-3xl p-8 bg-white rounded-lg">
            <button
              onClick={handleCloseModal}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-700 focus:outline-none"
            >
              Close
            </button>
            <h2 className="mb-4 text-2xl font-semibold">
              {selectedApod.title}
            </h2>
            <div className="flex flex-col md:flex-row">
              <div className="w-full pr-0 mb-4 md:w-1/2 md:pr-2 md:mb-0">
                <img
                  src={selectedApod.url}
                  alt={selectedApod.title}
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="w-full pl-0 md:w-1/2 md:pl-2">
                <p className="text-justify text-gray-700">{selectedApod.explanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Random2;
