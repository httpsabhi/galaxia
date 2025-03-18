import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import * as THREE from "three";
import CloseIcon from "@mui/icons-material/Close";

/* -------------- Texture Loader Helper -------------- */
const loadTexture = (path) => useLoader(THREE.TextureLoader, path);

/* -------------- Planets Data -------------- */
const planetsData = [
  { name: "Mercury", radius: 0.4, distance: 5,  texture: "/textures/mercury.jpg", orbitSpeed: 0.02, rotationSpeed: 0.005, initialTheta: Math.random() * Math.PI * 2 },
  { name: "Venus",   radius: 0.8, distance: 7,  texture: "/textures/venus.jpg",   orbitSpeed: 0.015, rotationSpeed: 0.003, initialTheta: Math.random() * Math.PI * 2 },
  { name: "Earth",   radius: 1,   distance: 9,  texture: "/textures/earth.jpg",   orbitSpeed: 0.012, rotationSpeed: 0.01,  initialTheta: Math.random() * Math.PI * 2 },
  { name: "Mars",    radius: 0.7, distance: 11, texture: "/textures/mars.jpg",    orbitSpeed: 0.01,  rotationSpeed: 0.008, initialTheta: Math.random() * Math.PI * 2 },
  { name: "Jupiter", radius: 2.5, distance: 17, texture: "/textures/jupiter.jpg", orbitSpeed: 0.008, rotationSpeed: 0.02,  initialTheta: Math.random() * Math.PI * 2 },
  { name: "Saturn",  radius: 2.2, distance: 26, texture: "/textures/saturn.jpg",  orbitSpeed: 0.007, rotationSpeed: 0.018, hasRings: true, initialTheta: Math.random() * Math.PI * 2 },
  { name: "Uranus",  radius: 1.8, distance: 35, texture: "/textures/uranus.jpg",  orbitSpeed: 0.006, rotationSpeed: 0.015, initialTheta: Math.random() * Math.PI * 2 },
  { name: "Neptune", radius: 1.8, distance: 39, texture: "/textures/neptune.jpg", orbitSpeed: 0.005, rotationSpeed: 0.012, initialTheta: Math.random() * Math.PI * 2 },
];

/* -------------- Orbit Path Component -------------- */
const OrbitPath = ({ distance }) => {
  // Creates a thin ring to visualize the orbit
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[distance - 0.01, distance + 0.01, 64]} />
      <meshBasicMaterial color="white" side={THREE.DoubleSide} transparent opacity={0.5} />
    </mesh>
  );
};

/* -------------- Planet Component -------------- */
const Planet = ({ name, radius, distance, texture, onClick, orbitSpeed, rotationSpeed, hasRings, initialTheta }) => {
  const groupRef = useRef();
  const sphereRef = useRef();
  const planetTexture = loadTexture(texture);

  // Move the planet in its orbit + rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const theta = initialTheta + t * orbitSpeed; // Start at random position
    if (groupRef.current) {
      groupRef.current.position.x = distance * Math.cos(theta);
      groupRef.current.position.z = distance * Math.sin(theta);
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <>
      {/* Orbit Path */}
      <OrbitPath distance={distance} />

      {/* Planet */}
      <group ref={groupRef} onClick={() => onClick(name)}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial map={planetTexture} />
          <Html position={[0, radius + 0.5, 0]} center>
            <Typography variant="caption" sx={{ color: "white" }}>
              {name}
            </Typography>
          </Html>
        </mesh>

        {/* Planet Rings (only Saturn) */}
        {hasRings && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.3, radius * 1.8, 64]} />
            <meshBasicMaterial
              map={loadTexture("/textures/saturn_ring.png")}
              side={THREE.DoubleSide}
              transparent
            />
          </mesh>
        )}
      </group>
    </>
  );
};

/* -------------- Sun Component -------------- */
const Sun = () => {
  const sunTexture = loadTexture("/textures/sun.jpg");

  return (
    <group>
      {/* Point Light at the Sun's position to illuminate planets */}
      <pointLight position={[0, 0, 0]} intensity={5} decay={2} distance={100} />

      {/* Sun Sphere */}
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial
          map={sunTexture}
          emissiveIntensity={3}
        />
      </mesh>

      {/* Glow Sphere (a bigger, semi-transparent sphere for corona-like effect) */}
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0xffaa00)}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

/* -------------- Main Scene -------------- */
const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handlePlanetClick = (planetName) => {
    setSelectedPlanet(planetName);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      {/* Sidebar: shows only if a planet is selected */}
      {selectedPlanet && (
        <Box
          sx={{
            width: "400px", // Fixed width for the sidebar
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: 3,
            position: "fixed", // Fixed position for overlay
            top: 80,
            left: 0,
            height: "100vh", // Full height
            zIndex: 10, // Ensure it's above the canvas
            overflowY: "auto", // Scrollable if content is long
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 16, right: 16 }}
            onClick={() => setSelectedPlanet(null)}
          >
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
          <Paper sx={{ padding: 3, backgroundColor: "#1c1c1c", borderRadius: "8px" }}>
            <Typography variant="h5" align="center" color="primary">
              {selectedPlanet}
            </Typography>
            <Typography variant="body1" align="center" color="white" sx={{ marginTop: 2 }}>
              Learn about {selectedPlanet} and its fascinating properties.
            </Typography>
          </Paper>
        </Box>
      )}

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [30, 15, 30], fov: 60 }} // Start camera away from the Sun
        style={{ width: "100vw", height: "100vh", background: "black" }}
      >
        {/* Dim ambient light + stars for background */}
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} />

        {/* Sun + Planets */}
        <Sun />
        {planetsData.map((planet, index) => (
          <Planet key={index} {...planet} onClick={handlePlanetClick} />
        ))}

        {/* OrbitControls with full user control */}
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={1}
          maxDistance={200}
        />
      </Canvas>
    </Box>
  );
};

export default SolarSystem;