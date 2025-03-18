import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import PlanetSelector from "./PlanetSelector";
import { planets } from "./planets";
import { StarsBackground } from "../ui/stars-background";
import { ShootingStars } from "../ui/shooting-stars";

// Planet Component with Rotation Animation
const Planet = ({ image, position, onClick, name, selected }) => {
  const planetTexture = useTexture(image);
  const planetRef = useRef();

  // Rotate the planet continuously
  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Sphere
      ref={planetRef}
      args={[2, 75, 75]}
      position={position}
      onClick={onClick}
      scale={selected ? 1.5 : 1}
    >
      <meshStandardMaterial map={planetTexture} />
    </Sphere>
  );
};

const PlanetExplorer = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0]);

  return (
    <div className="flex flex-col p-2 h-[90vh]">
      <StarsBackground />
      <ShootingStars />
      <div className="flex space-x-2 mb-4 z-20">
        <PlanetSelector
          onSelect={(planet) => {
            const selected = planets.find((p) => p.name === planet.name);
            if (selected) setSelectedPlanet(selected);
          }}
        />
      </div>

      <div className="flex w-full justify-between z-20">
        <Canvas style={{ height: "60vh", width: "60%" }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} />
          {/* Disable zoom */}
          <OrbitControls enableZoom={false} enablePan={true} />

          {/* Render only the selected planet */}
          <Planet
            key={selectedPlanet.name}
            image={selectedPlanet.image}
            position={[0, 0, 0]} // Center the selected planet
            onClick={() => setSelectedPlanet(selectedPlanet)}
            name={selectedPlanet.name}
            selected={true} // Always selected since only one is shown
          />
        </Canvas>

        {/* Info Panel with Advanced Animation */}
        <motion.div
          className="w-1/3 p-6 bg-gray-800/50 text-white rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold mb-4">{selectedPlanet.name}</h2>
          <p className="text-gray-300">{selectedPlanet.description}</p>
          <div className="mt-4 text-sm text-teal-400">
            Distance: {selectedPlanet.distance}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlanetExplorer;
