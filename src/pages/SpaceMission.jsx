import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import { Box, Typography, Paper, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const planetTextures = {
  Mercury: '/textures/mercury.jpg',
  Venus: '/textures/venus.jpg',
  Earth: '/textures/earth.jpg',
  Mars: '/textures/mars.jpg',
  Jupiter: '/textures/jupiter.jpg',
  Saturn: '/textures/saturn.jpg',
  Uranus: '/textures/uranus.jpg',
  Neptune: '/textures/neptune.jpg',
};

const planetsData = [
  { name: 'Mercury', radius: 0.4, position: [-20, 0, 0] },
  { name: 'Venus', radius: 0.9, position: [-15, 0, 0] },
  { name: 'Earth', radius: 1, position: [-10, 0, 0] },
  { name: 'Mars', radius: 0.7, position: [-5, 0, 0] },
  { name: 'Jupiter', radius: 2.5, position: [5, 0, 0] },
  { name: 'Saturn', radius: 2.2, position: [15, 0, 0] },
  { name: 'Uranus', radius: 1.5, position: [25, 0, 0] },
  { name: 'Neptune', radius: 1.4, position: [35, 0, 0] },
];

const missionTypes = ['Scientific Research', 'Satellite Deployment', 'Human Exploration'];

const Planet = ({ name, radius, position }) => {
  const texture = useLoader(THREE.TextureLoader, planetTextures[name]);
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Rocket = ({ source, destination, onComplete }) => {
  const rocketRef = useRef();
  const { scene } = useLoader(GLTFLoader, '/rocket.glb');
  // Create vectors for start and end positions
  const startPosition = new THREE.Vector3(...source.position);
  const endPosition = new THREE.Vector3(...destination.position);
  // Define a speed factor (units per second) and calculate flight duration based on distance
  const speedFactor = 2.0; // Adjust this value to speed up or slow down the rocket
  const distance = startPosition.distanceTo(endPosition);
  const duration = (distance / speedFactor) * 1000; // duration in ms
  const startTime = useRef(null);

  useEffect(() => {
    if (rocketRef.current) {
      rocketRef.current.position.copy(startPosition);
    }
  }, [startPosition]);

  useFrame(({ clock }) => {
    if (!startTime.current) startTime.current = clock.getElapsedTime();
    const elapsed = (clock.getElapsedTime() - startTime.current) * 1000;
    const progress = Math.min(elapsed / duration, 1);
    if (rocketRef.current) {
      rocketRef.current.position.lerpVectors(startPosition, endPosition, progress);
    }
    if (progress >= 1) onComplete();
  });

  return <primitive ref={rocketRef} object={scene} scale={0.5} />;
};

const MissionDashboard = ({ planets, onLaunch, missionStatus }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [missionType, setMissionType] = useState('');

  return (
    <Paper sx={{ padding: 3, backgroundColor: '#1c1c1c', borderRadius: '8px', margin: 2 }}>
      <Typography variant="h5" color="primary">Mission Control</Typography>
      <Typography variant="body1" color="white" sx={{ marginTop: 1 }}>
        Status: {missionStatus}
      </Typography>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel sx={{ color: 'white' }}>Mission Type</InputLabel>
        <Select value={missionType} onChange={(e) => setMissionType(e.target.value)} sx={{ color: 'white' }}>
          {missionTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel sx={{ color: 'white' }}>Source</InputLabel>
        <Select value={source} onChange={(e) => setSource(e.target.value)} sx={{ color: 'white' }}>
          {planets.map((planet) => (
            <MenuItem key={planet.name} value={planet.name}>{planet.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel sx={{ color: 'white' }}>Destination</InputLabel>
        <Select value={destination} onChange={(e) => setDestination(e.target.value)} sx={{ color: 'white' }}>
          {planets.map((planet) => (
            <MenuItem key={planet.name} value={planet.name}>{planet.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 2 }}
        onClick={() => onLaunch(source, destination, missionType)}
        disabled={!source || !destination || !missionType || source === destination}
      >
        Launch Mission
      </Button>
    </Paper>
  );
};

const Home = ({ startMission }) => (
  <Box sx={{ textAlign: 'center', padding: 5 }}>
    <Typography variant="h3" color="primary">Welcome to Space Mission</Typography>
    <Button variant="contained" color="secondary" sx={{ marginTop: 3 }} onClick={startMission}>
      Start Mission
    </Button>
  </Box>
);

const MissionControl = ({ onReturnHome }) => {
  const [missionStatus, setMissionStatus] = useState('Ready');
  const [activeMission, setActiveMission] = useState(null);
  const [rocketLaunched, setRocketLaunched] = useState(false);

  const handleLaunch = (sourceName, destinationName, missionType) => {
    const source = planetsData.find((p) => p.name === sourceName);
    const destination = planetsData.find((p) => p.name === destinationName);
    setMissionStatus(`Mission: ${missionType} from ${sourceName} to ${destinationName}`);
    setActiveMission({ source, destination });
    setRocketLaunched(true);
  };

  const handleFlightComplete = () => {
    setMissionStatus(`Arrived at ${activeMission.destination.name}`);
    setRocketLaunched(false);
  };

  return (
    <Box display="flex" height="100vh">
      <Canvas camera={{ position: [0, 10, 30] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        {activeMission ? (
          // Only show the source and destination planets when mission is active
          <>
            <Planet {...activeMission.source} />
            <Planet {...activeMission.destination} />
            {rocketLaunched && (
              <Rocket
                source={activeMission.source}
                destination={activeMission.destination}
                onComplete={handleFlightComplete}
              />
            )}
          </>
        ) : (
          // Otherwise, show all planets
          planetsData.map((planet) => <Planet key={planet.name} {...planet} />)
        )}
      </Canvas>
      <MissionDashboard planets={planetsData} onLaunch={handleLaunch} missionStatus={missionStatus} />
      <Button
        variant="outlined"
        color="secondary"
        onClick={onReturnHome}
        sx={{ position: 'absolute', top: 20, left: 20 }}
      >
        Return Home
      </Button>
    </Box>
  );
};

const SpaceMission = () => {
  const [gameState, setGameState] = useState('home');

  return (
    <Box>
      {gameState === 'home' ? (
        <Home startMission={() => setGameState('mission')} />
      ) : (
        <MissionControl onReturnHome={() => setGameState('home')} />
      )}
    </Box>
  );
};

export default SpaceMission;
