import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PayloadCard from "./PayloadCard";

const SpaceXPayloads = () => {
  const [payloads, setPayloads] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/payloads")
      .then((res) => res.json())
      .then((data) => setPayloads(data.slice(0, 8))) 
      .catch((err) => console.error("Error fetching payloads:", err));
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen text-white py-10 relative z-50">
      <h1 className="text-3xl font-bold">🚀 SpaceX Payloads</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {payloads.map((payload) => (
          <PayloadCard key={payload.id} payload={payload} />
        ))}
      </div>
      <Link to="/all-payloads">
        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold cursor-pointer z-50">
          View All Payloads →
        </button>
      </Link>
    </div>
  );
};

export default SpaceXPayloads;
