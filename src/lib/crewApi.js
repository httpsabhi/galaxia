import axios from 'axios';

export const fetchCrewMember = async (crewId) => {
  try {
    const response = await axios.get(`https://api.spacexdata.com/v4/crew/${crewId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching crew member with id ${crewId}:`, error);
    throw error;
  }
};

export const fetchMultipleCrewMembers = async (crewIds) => {
  const crewPromises = crewIds.map(id => fetchCrewMember(id));
  return Promise.all(crewPromises);
};
