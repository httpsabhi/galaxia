import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/button";
import PlanetExplorer from "../components/SpaceExploration/PlanetExplorer";
import SolarSystem from "../components/SpaceExploration/SolarSystem";

const SpaceExploration = () => {
  const [isExplorerMode, setIsExplorerMode] = useState(false);

  return (
    <div className="relative w-full h-[75vh] bg-black text-white flex flex-col items-center">
      <Button
        onClick={() => setIsExplorerMode(!isExplorerMode)}
        className="absolute top-8 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {isExplorerMode ? "View Solar System" : "Planet Explorer Mode"}
      </Button>
      {isExplorerMode ? (
        <PlanetExplorer />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full flex items-center justify-center"
        >
          <SolarSystem />
        </motion.div>
      )}
    </div>
  );
};

export default SpaceExploration;
