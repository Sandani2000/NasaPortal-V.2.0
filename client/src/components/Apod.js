import React, { useState, useEffect } from "react";
import { getAPOD } from "../utils/apodApiService";

const Apod = ({ data }) => {
  const [apodData, setAPODData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const data = await getAPOD();
        setAPODData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAPOD();

    // Cleanup function to enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-xl text-red-500">
          Error loading APOD: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen px-4 pt-10 bg-gray-800">
      {apodData && (
        <div className="w-full h-full max-w-6xl p-5 pb-10 bg-white border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="container mx-auto">
            <h1 className="mb-5 text-3xl font-bold text-center text-gray-900 dark:text-white md:text-left lg:text-center xl:text-center 2xl:text-5xl">
              Picture Of the Day
            </h1>

            <div className="flex flex-col justify-around lg:flex-row">
              {/* Image */}
              <div className="flex justify-center lg:w-2/5">
                <a
                  href={apodData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="object-cover h-auto rounded lg:h-full"
                    src={apodData.url}
                    alt="APOD"
                  />
                </a>
              </div>

              {/* Explanation */}
              <div className="w-full mt-5 lg:mt-0 lg:w-3/5 lg:pl-5">
                <div className="text-2xl font-semibold text-center text-gray-900 dark:text-white md:text-left lg:text-center xl:text-center 2xl:text-3xl">
                  {apodData.title}
                </div>
                <div className="py-3 text-xl font-normal text-justify md:text-justify lg:text-justify xl:text-center 2xl:text-justify">
                  {apodData.explanation}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apod;
