import { useState } from "react";
import Card from "./Card";
import CrewDetails from "./CrewDetails";
import { FaSearch } from "react-icons/fa";

export default function LaunchSearch({
  searchId,
  setSearchId,
  handleSearch,
  searchError,
  searchedLaunch,
  formatDate,
}) {
  const [loading, setLoading] = useState(false);

  const handleSearchClick = async () => {
    setLoading(true);
    await handleSearch();
    setLoading(false);
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-center text-white mb-4">
        Search a Launch by ID
      </h3>

      {/* Search Input & Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="Enter launch ID..."
          className="p-3 w-80 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button
          onClick={handleSearchClick}
          className="bg-blue-600 hover:bg-blue-500 transition duration-200 text-white p-3 rounded-lg shadow-md flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
          ) : (
            <>
              <FaSearch className="text-lg" />
              <span className="hidden sm:inline">Search</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {searchError && (
        <p className="text-red-500 text-center mt-3 font-medium">
          {searchError}
        </p>
      )}

      {/* Loader while fetching results */}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full w-10 h-10"></div>
        </div>
      )}

      {/* Searched Result */}
      {!loading && searchedLaunch && (
        <div className="mt-6 transition-opacity duration-500 ease-in-out opacity-100">
          <Card
            title={searchedLaunch.name}
            youtubeVideo={searchedLaunch.links?.youtube_id}
            description={
              searchedLaunch.success !== undefined
                ? searchedLaunch.success
                  ? "✅ Launch Successful"
                  : "❌ Launch Unsuccessful"
                : "ℹ️ No details available."
            }
            extra={
              <div className="text-gray-300 space-y-2">
                <p>
                  <strong className="text-white">Flight Number:</strong>{" "}
                  {searchedLaunch.flight_number}
                </p>
                <p>
                  <strong className="text-white">Date:</strong>{" "}
                  {formatDate(searchedLaunch.date_utc)}
                </p>
                {searchedLaunch.crew?.length ? (
                  <>
                    <h3 className="text-xl font-bold text-white mt-6 mb-3">
                      Crew Details
                    </h3>
                    <CrewDetails crewIds={searchedLaunch.crew} />
                  </>
                ) : (
                  <p className="italic text-gray-400 mt-2">
                    Crew details not available.
                  </p>
                )}
              </div>
            }
            link={searchedLaunch.links?.wikipedia}
          />
        </div>
      )}
    </div>
  );
}
