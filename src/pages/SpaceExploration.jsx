import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import * as THREE from 'three';
import CloseIcon from '@mui/icons-material/Close';

const loadTexture = (path) => useLoader(THREE.TextureLoader, path);

const planetsData = [
  { name: 'Mercury', radius: 0.4, distance: 5, texture: '/textures/mercury.jpg', orbitSpeed: 0.02, rotationSpeed: 0.005 },
  { name: 'Venus', radius: 0.8, distance: 7, texture: '/textures/venus.jpg', orbitSpeed: 0.015, rotationSpeed: 0.003 },
  { name: 'Earth', radius: 1, distance: 9, texture: '/textures/earth.jpg', orbitSpeed: 0.012, rotationSpeed: 0.01 },
  { name: 'Mars', radius: 0.7, distance: 11, texture: '/textures/mars.jpg', orbitSpeed: 0.01, rotationSpeed: 0.008 },
  { name: 'Jupiter', radius: 2.5, distance: 17, texture: '/textures/jupiter.jpg', orbitSpeed: 0.008, rotationSpeed: 0.02 },
  { name: 'Saturn', radius: 2.2, distance: 26, texture: '/textures/saturn.jpg', orbitSpeed: 0.007, rotationSpeed: 0.018, hasRings: true },
  { name: 'Uranus', radius: 1.8, distance: 35, texture: '/textures/uranus.jpg', orbitSpeed: 0.006, rotationSpeed: 0.015 },
  { name: 'Neptune', radius: 1.8, distance: 39, texture: '/textures/neptune.jpg', orbitSpeed: 0.005, rotationSpeed: 0.012 },
];

const Planet = ({ name, radius, distance, texture, onClick, orbitSpeed, rotationSpeed, hasRings }) => {
  // Use a group so that both the planet and, if present, the ring share the same orbital transform.
  const groupRef = useRef();
  const sphereRef = useRef();
  const planetTexture = loadTexture(texture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Update orbit: move the group along a circular path.
    groupRef.current.position.x = distance * Math.cos(t * orbitSpeed);
    groupRef.current.position.z = distance * Math.sin(t * orbitSpeed);
    // Update the planet's self rotation.
    if (sphereRef.current) {
      sphereRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} onClick={() => onClick(name)}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial map={planetTexture} />
        <Html position={[0, radius + 0.5, 0]} center>
          <Typography variant="caption" sx={{ color: 'white' }}>{name}</Typography>
        </Html>
      </mesh>
      {hasRings && (
        // The ring is a child of the group so it rotates along with the planet.
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.3, radius * 1.8, 64]} />
          <meshBasicMaterial 
            map={loadTexture('/textures/saturn_ring.png')} 
            side={THREE.DoubleSide} 
            transparent 
          />
        </mesh>
      )}
    </group>
  );
};

const SpaceExploration = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const handlePlanetClick = (planetName) => setSelectedPlanet(planetName);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <Canvas style={{ width: '80vw', height: '100vh', background: 'black' }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={3} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <OrbitControls />
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial 
            map={loadTexture('/textures/sun.jpg')} 
            emissiveIntensity={3} 
          />
        </mesh>
        {planetsData.map((planet, index) => (
          <Planet key={index} {...planet} onClick={handlePlanetClick} />
        ))}
      </Canvas>
      <Box 
        sx={{ 
          width: '20vw', 
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          color: 'white', 
          padding: 3, 
          position: 'relative', 
          zIndex: 10 
        }}
      >
        <IconButton 
          sx={{ position: 'absolute', top: 16, right: 16 }} 
          onClick={() => setSelectedPlanet(null)}
        >
          <CloseIcon sx={{ color: 'white' }} />
        </IconButton>
        {selectedPlanet ? (
          <Paper sx={{ padding: 3, backgroundColor: '#1c1c1c', borderRadius: '8px' }}>
            <Typography variant="h5" align="center" color="primary">{selectedPlanet}</Typography>
            <Typography variant="body1" align="center" color="white" sx={{ marginTop: 2 }}>
              Learn about {selectedPlanet} and its fascinating properties.
            </Typography>
          </Paper>
        ) : (
          <Typography variant="h6" color="white">Click a planet to explore!</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SpaceExploration;
