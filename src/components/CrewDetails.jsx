import React, { useEffect, useState } from 'react';
import { fetchMultipleCrewMembers } from '../lib/crewApi';
import CrewCard from './CrewCard';
import Loader from './Loader';

const CrewDetails = ({ crewIds }) => {
  const [crewMembers, setCrewMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCrewMembers = async () => {
      try {
        const crewData = await fetchMultipleCrewMembers(crewIds);
        setCrewMembers(crewData);
      } catch (error) {
        console.error("Error fetching crew details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (crewIds.length > 0) {
      getCrewMembers();
    } else {
      setLoading(false);
    }
  }, [crewIds]);

  if (loading) return <Loader />;
  if (crewMembers.length === 0)
    return <p className="text-white">No crew data available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {crewMembers.map((member) => (
        <CrewCard
          key={member.id}
          name={member.name}
          agency={member.agency}
          image={member.image}
          wikipedia={member.wikipedia}
          status={member.status}
        />
      ))}
    </div>
  );
};

export default CrewDetails;
