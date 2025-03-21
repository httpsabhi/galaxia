import React from "react";
import IssTracker from "../components/ISSTracker/IssTracker";
import Astronauts from "../components/ISSTracker/Astronauts";
import LiveEarthView from "../components/ISSTracker/LiveEarthView";

const IssTrackerPage = () => {
  return (
    <div className="bg-black text-white min-h-screen pb-2.5">
      <IssTracker />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 px-8">
        <Astronauts />
        <LiveEarthView />
      </div>
    </div>
  );
};

export default IssTrackerPage;
