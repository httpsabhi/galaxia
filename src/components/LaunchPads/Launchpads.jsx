import LaunchpadCard from "./LaunchpadCard";
import LaunchpadModal from "./LaunchpadModal";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Typography, Grid, CircularProgress, Box, Backdrop } from "@mui/material";
import { fetchLaunchpads, fetchLaunchpadById } from "../../lib/launchpadService";

const Launchpads = () => {
  const [launchpads, setLaunchpads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLaunchpad, setSelectedLaunchpad] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const getLaunchpads = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLaunchpads();
        setLaunchpads(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getLaunchpads();
  }, []);

  // Memoize launchpads to prevent unnecessary re-renders
  const launchpadList = useMemo(() => launchpads, [launchpads]);

  // Open Modal and Fetch Detailed Data
  const handleOpenModal = useCallback(async (id) => {
    setModalLoading(true);
    setSelectedLaunchpad(null);
    try {
      const data = await fetchLaunchpadById(id);
      setSelectedLaunchpad(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setModalLoading(false);
    }
  }, []);

  return (
    <Box sx={{ padding: 3, maxWidth: "90vw", margin: "auto", textAlign: "center" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          color: "white",
          textShadow: "2px 2px 10px rgba(255,255,255,0.3)",
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        🚀 SpaceX Launchpads
      </Typography>

      {/* Fullscreen Backdrop Loader */}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress size={60} />
      </Backdrop>

      {/* Error Handling */}
      {error && (
        <Box display="flex" justifyContent="center" alignItems="center" height="30vh">
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Box>
      )}

      {/* Launchpads Grid */}
      {!loading && !error && (
        <Grid container spacing={4} justifyContent="center">
          {launchpadList.length > 0 ? (
            launchpadList.map((launchpad) => (
              <LaunchpadCard
                key={launchpad.id}
                launchpad={launchpad}
                onReadMore={handleOpenModal}
              />
            ))
          ) : (
            <Typography color="white" variant="h6">
              No launchpads available.
            </Typography>
          )}
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
