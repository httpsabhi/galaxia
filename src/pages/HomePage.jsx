// src/pages/HomePage.jsx
import React from "react";
import Header from "../components/Header";
import SpaceXLaunches from "../components/SpaceXLaunches";
import NasaApodComponent from "../components/NasaApod";
import Launchpads from "../components/LaunchPads/Launchpads";
import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from "../components/ui/stars-background";
import SpaceXPayloads from "../components/Payloads/SpaceXPayloads";
import Home from "../components/Home/Home";

const HomePage = () => {
  return (
    <section className="relative min-h-screen bg-black w-full overflow-hidden">
      <Home />
      <div className="relative z-10">
        <StarsBackground />
        <ShootingStars />
        <section className="container mx-auto p-4 mt-8">
          <NasaApodComponent />
          <SpaceXLaunches />
          <Launchpads />
          <SpaceXPayloads />
        </section>
      </div>
    </section>
  );
};

export default HomePage;
