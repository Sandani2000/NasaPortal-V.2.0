const API_KEY = "seZLO1FhEtGRxIhgoPmHylQfcYftvHca1llihQTn";

export const getRoverPhotosBySol = async (
  rover,
  sol,
  camera = null,
  page = 1
) => {
  let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${API_KEY}&page=${page}`;

  if (camera) {
    apiUrl += `&camera=${camera}`;
  }

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

export const getRoverPhotosByEarthDate = async (
  rover,
  earthDate,
  camera = null,
  page = 1
) => {
  let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earthDate}&api_key=${API_KEY}&page=${page}`;
  if (camera) {
    apiUrl += `&camera=${camera}`;
  }

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


export const getRoverManifest = async (rover) => {
  const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.photo_manifest;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
