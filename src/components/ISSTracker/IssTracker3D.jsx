import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture, useGLTF } from "@react-three/drei";
import SatelliteInfoModal from "./SatelliteInfoModal";

// Load the 3D ISS model
function IssModel({ position, onPointerDown }) {
  const { scene } = useGLTF("/iss.glb"); 
  const ISSRef = useRef();

  useFrame(()=>{
    if(ISSRef.current){
      ISSRef.current.rotation.y += 0.001; 
      ISSRef.current.rotation.x += 0.001; 
    }
  })
  return (
    <primitive ref={ISSRef} object={scene} position={position} scale={[0.02, 0.02, 0.02]} onPointerDown={onPointerDown} />
  );
}

function Earth() {
  const earthRef = useRef();
  const cloudRef = useRef();
  const [earthTexture, cloudsTexture] = useTexture([
    "/textures/earth.jpg", 
    "/textures/earth_clouds.jpg", // Cloud texture
  ]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0001; 
    }
  });

  useFrame(() => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.0001; 
      cloudRef.current.rotation.x += 0.00001; 
    }
  });

  return (
    <>
      {/* Earth Sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[5, 74, 74]} /> 
        <meshPhongMaterial map={earthTexture} transparent opacity={1} />
      </mesh>

      <mesh ref={cloudRef}>
        <sphereGeometry args={[5.05, 74, 74]} /> 
        <meshPhongMaterial
          map={cloudsTexture}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Atmospheric Glow */}
      <mesh>
        <sphereGeometry args={[5.2, 74, 74]} /> 
        <meshBasicMaterial color={0x1e90ff} transparent opacity={0.1} />
      </mesh>
    </>
  );
}

function IssTracker({ position, onPointerDown }) {
  const [issPosition, setIssPosition] = useState([0, 0, 0]);

  useEffect(() => {
    if (position) {
      const { lat, lon } = position;

      // Convert latitude/longitude to 3D coordinates
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const radius = 7.3;

      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      setIssPosition([x, y, z]);
    }
  }, [position]);

  return <IssModel position={issPosition} onPointerDown={onPointerDown} />;
}

export default function IssTracker3D({ position }) {
  const controlsRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const toogleModal = () => setModalOpen(!modalOpen);

  return (
    <div style={{ width: "100%", height: "75vh" }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45, near: 0.1, far: 1000 }}>
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[7, 7, 7]} intensity={1.2} />

        {/* Earth */}
        <Earth />

        {/* ISS Tracker */}
        {position && (
          <IssTracker position={position} onPointerDown={toogleModal} />
        )}

        {/* Controls */}
        <OrbitControls
          ref={controlsRef}
          enablePan
          enableZoom
          enableRotate
          minDistance={7}
          maxDistance={50}
          target={[0, 0, 0]}
        />

        {/* Starry Background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
      </Canvas>

      {/* Satellite Info Modal */}
      <SatelliteInfoModal isOpen={modalOpen} onRequestClose={toogleModal} />
    </div>
  );
}
