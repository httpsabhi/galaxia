// SpaceXLaunches.jsx
import { useEffect, useState } from "react";
import Card from "./Card";
import CrewDetails from "./CrewDetails";
import LaunchSearch from "./LaunchSearch"; // <-- import our new component
import { fetchLatestLaunch, fetchNextLaunch, fetchLaunchById } from "../lib/spacexApi";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

export default function SpaceXLaunches() {
  const [latestLaunch, setLatestLaunch] = useState(null);
  const [nextLaunch, setNextLaunch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNextLaunch, setShowNextLaunch] = useState(false);

  // For searching by ID
  const [searchId, setSearchId] = useState("");
  const [searchedLaunch, setSearchedLaunch] = useState(null);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const latest = await fetchLatestLaunch();
        const next = await fetchNextLaunch();
        setLatestLaunch(latest);
        setNextLaunch(next);
      } catch (error) {
        console.error("Failed to fetch SpaceX launch data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Simple date formatter
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleString() : "Unknown date";

  // Called when user clicks 'Search Launch'
  const handleSearch = async () => {
    if (!searchId) return;
    setLoading(true);
    setSearchError("");
    setSearchedLaunch(null);

    try {
      const launch = await fetchLaunchById(searchId);
      if (!launch) {
        setSearchError("No launch found for that ID.");
      } else {
        setSearchedLaunch(launch);
      }
    } catch (error) {
      console.error("Error searching launch by ID:", error);
      setSearchError("Failed to find launch.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-white text-center">Loading launch data...</p>;
  }

  if (!latestLaunch && !nextLaunch) {
    return <p className="text-white text-center">No launch data available.</p>;
  }

  return (
    <div className="my-8 px-4 relative flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        {showNextLaunch ? "Upcoming SpaceX Launch" : "Latest SpaceX Launch"}
      </h2>

      <div className="relative w-full max-w-[90vw] overflow-hidden">
        {/* Slide container */}
        <div
          className={`flex transition-transform duration-500 ease-in-out ${
            showNextLaunch ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          {/* Latest Launch Card */}
          <div className="w-full shrink-0">
            {latestLaunch && (
              <Card
                title={latestLaunch.name}
                youtubeVideo={latestLaunch.links?.youtube_id}
                description={
                  latestLaunch.success !== undefined
                    ? latestLaunch.success
                      ? "Launch Successful"
                      : "Launch Unsuccessful"
                    : "No details available."
                }
                extra={
                  <>
                    <p>
                      <strong>Flight Number:</strong>{" "}
                      {latestLaunch.flight_number}
                    </p>
                    <p>
                      <strong>Date:</strong> {formatDate(latestLaunch.date_utc)}
                    </p>
                    {latestLaunch.crew?.length ? (
                      <>
                        <h3 className="text-xl font-bold text-white mt-8 mb-4">
                          Crew Details
                        </h3>
                        <CrewDetails crewIds={latestLaunch.crew} />
                      </>
                    ) : (
                      <p className="text-gray-300 italic mt-2">
                        Crew details not available.
                      </p>
                    )}
                  </>
                }
                link={latestLaunch.links?.wikipedia}
              />
            )}
          </div>

          {/* Next Launch Card */}
          <div className="w-full shrink-0">
            {nextLaunch && (
              <>
                <Card
                  title={nextLaunch.name}
                  youtubeVideo={nextLaunch.links?.youtube_id}
                  description={"Upcoming Launch"}
                  extra={
                    <>
                      <p>
                        <strong>Flight Number:</strong>{" "}
                        {nextLaunch.flight_number}
                      </p>
                      <p>
                        <strong>Date:</strong> {formatDate(nextLaunch.date_utc)}
                      </p>
                      <p className="text-gray-300 italic mt-2">
                        Crew details not available.
                      </p>
                    </>
                  }
                  link={nextLaunch.links?.wikipedia}
                />

                {/* 
                  🔥 Our new LaunchSearch component 
                  appears BELOW the Next Launch card.
                */}
                <LaunchSearch
                  searchId={searchId}
                  setSearchId={setSearchId}
                  handleSearch={handleSearch}
                  searchError={searchError}
                  searchedLaunch={searchedLaunch}
                  formatDate={formatDate}
                />
              </>
            )}
          </div>
        </div>

        {/* Left Arrow (Go back to Latest Launch) */}
        {showNextLaunch && (
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10"
            onClick={() => setShowNextLaunch(false)}
            aria-label="Show latest launch"
          >
            <FiArrowLeft className="text-white text-2xl" />
          </button>
        )}

        {/* Right Arrow (Go to Next Launch) */}
        {!showNextLaunch && nextLaunch && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10"
            onClick={() => setShowNextLaunch(true)}
            aria-label="Show upcoming launch"
          >
            <FiArrowRight className="text-white text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
}
