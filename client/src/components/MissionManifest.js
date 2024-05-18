import React, { useState, useEffect } from "react";
import { getRoverManifest } from "../utils/RoverApiService";

const MissionManifest = () => {
  const [rover, setRover] = useState("curiosity");
  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManifest = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRoverManifest(rover);
        setManifest(data);
      } catch (error) {
        setError("Failed to fetch mission manifest");
      } finally {
        setLoading(false);
      }
    };

    fetchManifest();
  }, [rover]);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center text-gray-900">
        Mission Manifest
      </h1>
      <form className="flex flex-col items-center mb-8 lg:flex-row lg:justify-center">
        {/* Rover selection */}
        <div className="flex flex-col mb-4 lg:mb-0 lg:mr-6">
          <label htmlFor="rover" className="mb-2 text-lg font-semibold text-gray-700">
            Rover:
          </label>
          <select
            id="rover"
            value={rover}
            onChange={(e) => setRover(e.target.value)}
            className="px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </div>
      </form>

      {/* Manifest display */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : manifest ? (
        <div className="p-6 bg-white border border-gray-200 rounded-md shadow-md">
          <p className="mb-4 text-lg font-semibold text-gray-900">Name: {manifest.name}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <p className="text-gray-700">
              <span className="font-semibold">Landing Date:</span> {manifest.landing_date}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Launch Date:</span> {manifest.launch_date}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span> {manifest.status}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Max Sol:</span> {manifest.max_sol}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Max Date:</span> {manifest.max_date}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Photos:</span> {manifest.total_photos}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No manifest data available</p>
      )}
    </div>
  );
};

export default MissionManifest;
