import { FaSatellite, FaWeightHanging, FaGlobe, FaUsers, FaFlag } from "react-icons/fa";

const PayloadCard = ({ payload, showNationalities = false }) => {
  return (
    <div className="bg-gray-900 text-white p-5 rounded-lg shadow-lg border border-gray-700 w-full max-w-sm">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <FaSatellite className="text-yellow-400" /> {payload.name || "Unknown Payload"}
      </h2>
      <p className="text-gray-300 mt-1">{payload.type || "Unknown Type"}</p>

      <div className="mt-4 space-y-2">
        {/* Customers */}
        <p className="flex items-center gap-2">
          <FaUsers className="text-green-400" />
          <strong>Customers:</strong>{" "}
          {payload.customers?.length > 0 ? payload.customers.join(", ") : "N/A"}
        </p>

        {showNationalities && (
          <p className="flex items-center gap-2">
            <FaFlag className="text-blue-400" />
            <strong>Nationalities:</strong>{" "}
            {payload.nationalities?.length > 0 ? payload.nationalities.join(", ") : "N/A"}
          </p>
        )}

        {/* Orbit */}
        <p className="flex items-center gap-2">
          <FaGlobe className="text-blue-400" />
          <strong>Orbit:</strong> {payload.orbit} ({payload.reference_system})
        </p>
        {/* Mass */}
        <p className="flex items-center gap-2">
          <FaWeightHanging className="text-red-400" />
          <strong>Mass:</strong> {payload.mass_kg ? `${payload.mass_kg} kg` : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default PayloadCard;
