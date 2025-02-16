import {
    Typography,
    CircularProgress,
    Box,
    Chip,
    Modal,
  } from "@mui/material";
  import MapComponent from "../MapComponent";

const LaunchpadModal = ({ open, onClose, launchpad, loading }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "#121212",
          color: "white",
          boxShadow: 24,
          borderRadius: 2,
          padding: 3,
          outline: "none",
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress size={50} sx={{ color: "#ffffff" }} />
          </Box>
        ) : (
          launchpad && (
            <>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#ffcc00" }}
              >
                {launchpad.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#ddd", marginBottom: 2 }}
              >
                {launchpad.locality}, {launchpad.region}
              </Typography>
              <Chip
                label={launchpad.status.toUpperCase()}
                sx={{
                  backgroundColor:
                    launchpad.status === "active" ? "#2ecc71" : "#e74c3c",
                  color: "white",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              />
              <Box sx={{ marginBottom: 2 }}>
                <MapComponent
                  lat={launchpad.latitude}
                  lng={launchpad.longitude}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#ccc", fontSize: "0.9rem", fontStyle: "italic" }}
              >
                {launchpad.details || "No details available"}
              </Typography>
            </>
          )
        )}
      </Box>
    </Modal>
  );
};

export default LaunchpadModal;