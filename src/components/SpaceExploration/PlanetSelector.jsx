import React, { useState } from "react";
import { motion } from "framer-motion";
import { planets } from "./planets"; // Import shared data

const PlanetSelector = ({ onSelect }) => {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0].name);

  return (
    <div className="flex gap-2 w-full p-2 rounded-lg mt-8">
      {planets.map((planet) => (
        <motion.div
          key={planet.name}
          className={`flex p-2 cursor-pointer rounded-lg transition-all gap-1 ${
            selectedPlanet === planet.name
              ? "border-b-2 border-b-teal-500 text-white"
              : "text-gray-300"
          }`}
          onClick={() => {
            setSelectedPlanet(planet.name);
            onSelect(planet);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Selection Indicator */}
          <div className={`w-2 h-2 border-1 border-white rounded-full ${selectedPlanet === planet.name ? "bg-teal-500" : ""}`} />
          {/* Planet Image */}
          <img
            src={planet.image}
            alt={planet.name}
            className="w-9 h-9 rounded-full object-cover"
          />
          {/* Planet Info */}
          <div className="flex flex-col">
            <span className="text-xs font-bold">{planet.name}</span>
            <span className="text-[0.6rem]">{planet.distance}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PlanetSelector;