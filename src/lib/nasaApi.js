import axios from "axios";

const NASA_API_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "ovQtHry5RPTUZ98ebIwaZ5ZKAWjIdAcntQa6gRGd";

export const fetchNasaApod = async () => {
  try {
    const response = await axios.get(`${NASA_API_URL}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching NASA APOD:", error);
    throw error;
  }
};
