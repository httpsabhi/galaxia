import axios from "axios";

const API_BASE_URL = "https://api.spacexdata.com/v4/launchpads";

// Fetch all launchpads
export const fetchLaunchpads = async () => {
  try {
    const { data } = await axios.get(API_BASE_URL);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch launchpad data. Please try again later.");
  }
};

// Fetch a specific launchpad by ID
export const fetchLaunchpadById = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/${id}`);
    return data;
  } catch (error) {
    throw new Error("Error fetching launchpad details.");
  }
};
