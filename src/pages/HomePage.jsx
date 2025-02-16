// src/pages/HomePage.jsx
import React from "react";
import Header from "../components/Header";
import SpaceXLaunches from "../components/SpaceXLaunches";
import NasaApodComponent from "../components/NasaApod";
import Launchpads from "../components/LaunchPads/Launchpads";
import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from "../components/ui/stars-background";
import SpaceXPayloads from "../components/SpaceXPayloads";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-black w-full overflow-hidden">
      <StarsBackground />
      <ShootingStars />
      <div className="relative z-10">
        <section className="container mx-auto p-4 mt-8">
          <NasaApodComponent />
          <SpaceXLaunches />
          <Launchpads />
          <SpaceXPayloads />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
