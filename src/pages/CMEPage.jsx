import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { FaSearch } from "react-icons/fa";
import Sun3D from "../components/Sun3D";
import CMECards from "../components/CMECards";
import axios from "axios";

export default function CMEPage() {
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [cmeData, setCMEData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCMEData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=ovQtHry5RPTUZ98ebIwaZ5ZKAWjIdAcntQa6gRGd`
      );
      setCMEData(res.data);
    } catch (error) {
      console.error("Error fetching CME data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCMEData();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen px-6 py-5">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold">☀️ Coronal Mass Ejections (CMEs)</h1>
        <p className="text-gray-400 mt-2">
          Powerful bursts of plasma and magnetic field from the Sun.
        </p>
      </motion.div>

      {/* 3D Sun Visualization */}
      <div className="w-full h-98 my-10">
        <Sun3D />
      </div>

      {/* Search CME Data */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-800 p-3 rounded-md text-white"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-800 p-3 rounded-md text-white"
        />
        <button
          onClick={fetchCMEData}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaSearch /> Search
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-yellow-400 mt-5">Loading...</p>
      )}

      {/* CME Data Display */}
      {!loading && cmeData.length > 0 && <CMECards events={cmeData} />}
    </div>
  );
}
