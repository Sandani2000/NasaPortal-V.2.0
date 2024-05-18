import React, { useState, useEffect } from "react";
import { getRoverPhotosBySol } from "../utils/RoverApiService";
import backgroundImage from "../images/Backgroud4.jpg";

const RoverPhotosBySol = () => {
  const [rover, setRover] = useState("curiosity");
  const [sol, setSol] = useState("");
  const [camera, setCamera] = useState("all");
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [showSection2, setShowSection2] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRoverPhotosBySol(
        rover,
        sol,
        camera === "all" ? null : camera,
        page
      );
      setPhotos(data?.photos ?? []);
      setTotalPages(data?.total_pages ?? 1);
      setShowSection2(true);
    } catch (error) {
      setError("Failed to fetch photos");
    } finally {
      setLoading(false);
    }
  };

  const decreaseSector1Height = () => {
    const sector1 = document.getElementById("sector1");
    if (sector1) {
      sector1.style.height = "auto";
    }
  };

  useEffect(() => {
    if (sol.trim() !== "") {
      fetchPhotos();
    }
  }, [sol, camera, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    decreaseSector1Height();
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="container px-0 mx-0 bg-gray-800">
      <div
        className="flex flex-col items-center justify-center h-screen sector1 md:px-20 md:py-3"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="mb-24 md:justify-start">
          <h1 className="mb-4 text-3xl font-bold md:text-6xl text-gray-50 ">
            Mars Rover Photos
          </h1>
        </div>
        <div className="px-6 py-5 mb-24 bg-gray-400 bg-opacity-50">
          <form
            onSubmit={handleSearch}
            className="flex flex-wrap justify-center mb-4 lg:justify-start"
          >
            {/* Rover selection */}
            <div className="flex flex-col mb-2 mr-4">
              <label htmlFor="rover" className="text-lg font-semibold">
                Rover:
              </label>
              <select
                id="rover"
                value={rover}
                onChange={(e) => setRover(e.target.value)}
                className="mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="curiosity">Curiosity</option>
                <option value="opportunity">Opportunity</option>
                <option value="spirit">Spirit</option>
              </select>
            </div>

            {/* Sol input */}
            <div className="flex flex-col mb-2 mr-4">
              <label htmlFor="sol" className="text-lg font-semibold">
                Sol:
              </label>
              <input
                type="number"
                id="sol"
                value={sol}
                onChange={(e) => setSol(e.target.value)}
                className="mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Camera selection */}
            <div className="flex flex-col mb-2 mr-4">
              <label htmlFor="camera" className="text-lg font-semibold">
                Camera:
              </label>
              <select
                id="camera"
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
                className="mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All</option>
                <option value="fhaz">
                  Front Hazard Avoidance Camera (FHAZ)
                </option>
                <option value="rhaz">
                  Rear Hazard Avoidance Camera (RHAZ)
                </option>
                <option value="mast">Mast Camera (MAST)</option>
                <option value="chemcam">
                  Chemistry and Camera Complex (CHEMCAM)
                </option>
                <option value="mahli">Mars Hand Lens Imager (MAHLI)</option>
                <option value="mardi">Mars Descent Imager (MARDI)</option>
                <option value="navcam">Navigation Camera (NAVCAM)</option>
                <option value="pancam">Panoramic Camera (PANCAM)</option>
                <option value="minites">
                  Miniature Thermal Emission Spectrometer (MINITES)
                </option>
              </select>
            </div>

            {/* Page input */}
            <div className="flex flex-col mb-2 mr-4">
              <label htmlFor="page" className="text-lg font-semibold">
                Page:
              </label>
              <input
                type="number"
                id="page"
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="px-5 py-2 mt-6 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className={showSection2 ? "sector2" : "hidden"}>
        {/* Photo display */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <div key={photo.id} className="p-4 bg-gray-200 rounded">
                <img
                  src={photo.img_src}
                  alt={`Rover Photo - ${photo.id}`}
                  className="w-full h-auto"
                />
                <p className="mt-2 text-sm">{photo.earth_date}</p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 mr-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoverPhotosBySol;
