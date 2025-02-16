import axios from "axios";

const SPACEX_API_URL = "https://api.spacexdata.com/v4";

// Fetch latest launch
export const fetchLatestLaunch = async () => {
  try {
    const response = await axios.get(`${SPACEX_API_URL}/launches/latest`);
    return response.data;
  } catch (error) {
    console.error("Error fetching latest SpaceX launch:", error);
    throw error;
  }
};

// Fetch next upcoming launch
export const fetchNextLaunch = async () => {
  try {
    const response = await axios.get(`${SPACEX_API_URL}/launches/next`);
    return response.data;
  } catch (error) {
    console.error("Error fetching next SpaceX launch:", error);
    throw error;
  }
};

// Fetch launch by id
export const fetchLaunchById = async (id) => {
  try {
    const response = await axios.get(`${SPACEX_API_URL}/launches/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching SpaceX launch Id:", error);
    throw error;
  }
};