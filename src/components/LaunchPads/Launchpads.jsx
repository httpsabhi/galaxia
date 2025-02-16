import LaunchpadCard from "./LaunchpadCard";
import LaunchpadModal from "./LaunchpadModal";
import { useState, useEffect, useCallback } from "react";
import { Typography, Grid, CircularProgress, Box } from "@mui/material";
import axios from "axios";

const Launchpads = () => {
  const [launchpads, setLaunchpads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaunchpad, setSelectedLaunchpad] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const fetchLaunchpads = async () => {
      try {
        const { data } = await axios.get(
          "https://api.spacexdata.com/v4/launchpads"
        );
        setLaunchpads(data);
      } catch (error) {
        console.error("Error fetching launchpad data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLaunchpads();
  }, []);

  // Open Modal and Fetch Detailed Data
  const handleOpenModal = useCallback(async (id) => {
    setModalLoading(true);
    setSelectedLaunchpad(null);
    try {
      const { data } = await axios.get(
        `https://api.spacexdata.com/v4/launchpads/${id}`
      );
      setSelectedLaunchpad(data);
    } catch (error) {
      console.error("Error fetching launchpad details:", error);
    } finally {
      setModalLoading(false);
    }
  }, []);

  return (
    <Box
      sx={{ padding: 3, maxWidth: "90vw", margin: "auto", textAlign: "center" }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          color: "white",
          textShadow: "2px 2px 10px rgba(255,255,255,0.3)",
        }}
      >
        🚀 SpaceX Launchpads
      </Typography>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="30vh"
        >
          <CircularProgress size={50} sx={{ color: "#ffffff" }} />
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {launchpads.map((launchpad) => (
            <LaunchpadCard
              key={launchpad.id}
              launchpad={launchpad}
              onReadMore={handleOpenModal}
            />
          ))}
        </Grid>
      )}

      {/* Modal Component */}
      <LaunchpadModal
        open={Boolean(selectedLaunchpad)}
        onClose={() => setSelectedLaunchpad(null)}
        launchpad={selectedLaunchpad}
        loading={modalLoading}
      />
    </Box>
  );
};

export default Launchpads;
