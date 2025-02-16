import { motion } from "framer-motion";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

// Helper function to convert time to a readable format
const formatTime = (timeStr) => {
  if (!timeStr) return "N/A";
  const dateObj = new Date(timeStr);
  return dateObj.toLocaleString(); // Customize locales or options if desired
};

export default function CMECards({ events = [] }) {
  return (
    <div className="p-6 z-50">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Recent Coronal Mass Ejections (CME) 🌞
      </h2>

      {/* Explanation of Terms */}
      <div className="text-gray-400 text-sm mb-4">
        <p>
          <strong>Start Time:</strong> When the CME was first observed.
        </p>
        <p>
          <strong>Impact:</strong> Locations or spacecraft predicted to be
          affected by the CME.
        </p>
        <p>
          <strong>Velocity:</strong> The estimated speed of the CME in
          kilometers per second (km/s).
        </p>
        <p>
          <strong>Glancing Blow:</strong> If true, the CME only partially
          (tangentially) affects the target; otherwise, it's a more direct hit.
        </p>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-400">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => {
            // Safely extract nested fields
            const analysis = event.cmeAnalyses?.[0];
            const enlil = analysis?.enlilList?.[0];
            const impacts = enlil?.impactList || [];

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 text-white rounded-xl p-5 shadow-lg border border-gray-700 transition-all"
              >
                {/* Card Header */}
                <div className="flex items-center gap-4">
                  <RocketLaunchIcon className="h-8 w-8 text-yellow-400" />
                  <h3 className="text-xl font-semibold">
                    CME Event {index + 1}
                  </h3>
                </div>

                {/* Basic Info */}
                <p className="mt-3 text-gray-300">
                  {event.catalog}
                </p>
                <p className="mt-3 text-gray-300">
                  <strong>Start Time:</strong> {formatTime(event.startTime)}
                </p>

                {/* Speed from analysis, if present */}
                <p className="text-gray-300">
                  <strong>Velocity:</strong>{" "}
                  {analysis?.speed ? `${analysis.speed} km/s` : "N/A"}
                </p>

                {/* Impact List, if any */}
                {impacts.length > 0 ? (
                  <div className="mt-3 text-gray-300">
                    <strong>Impacts:</strong>
                    <ul className="list-inside ml-4 mt-2">
                      {impacts.map((impact, i) => (
                        <li key={i}>
                          <p>
                            <strong>Location:</strong> {impact.location}
                          </p>
                          <p>
                            <strong>Arrival Time:</strong>{" "}
                            {formatTime(impact.arrivalTime)}
                          </p>
                          <p>
                            <strong>Glancing Blow:</strong>{" "}
                            {impact.isGlancingBlow ? "Yes" : "No"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-300">
                    <strong>Impacts:</strong> Unknown
                  </p>
                )}

                {/* Additional details link */}
                <a
                  href={event.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-blue-400 hover:underline"
                >
                  More Details →
                </a>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
