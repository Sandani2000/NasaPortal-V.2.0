const API_KEY = "seZLO1FhEtGRxIhgoPmHylQfcYftvHca1llihQTn";

export const getAPOD = async () => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch APOD data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching APOD:", error);
    throw error;
  }
};

export const fetchApodDataRange = async (startDate, endDate) => {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    
    // Check if the data is an array, if not, wrap it in an array
    if (Array.isArray(data)) {
      return data;
    } else {
      return [data];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const fetchRandomApodData = async (count) => {
  let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

//-------------------------------------------- Mars Rover Photos API -----------------------------------------------------//
// export const getRoverPhotosBySol = async (
//   rover,
//   sol,
//   camera = null,
//   page = 1
// ) => {
//   let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${API_KEY}&page=${page}`;

//   if (camera) {
//     apiUrl += `&camera=${camera}`;
//   }

//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };
