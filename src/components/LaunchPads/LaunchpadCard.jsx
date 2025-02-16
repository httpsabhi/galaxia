import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Chip,
  Button,
  Modal,
} from "@mui/material";
import { CardActionArea } from "@mui/material";

const LaunchpadCard = ({ launchpad, onReadMore }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
          },
        }}
      >
        <CardActionArea
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          {/* Image */}
          {launchpad.images.large?.length > 0 && (
            <CardMedia
              component="img"
              image={launchpad.images.large[0]}
              alt={launchpad.name}
              sx={{ width: "100%", height: 200, objectFit: "cover" }}
            />
          )}

          {/* Card Content */}
          <CardContent sx={{ flexGrow: 1, color: "white", padding: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#ffcc00" }}
            >
              {launchpad.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#ddd" }}>
              {launchpad.locality}, {launchpad.region}
            </Typography>
            <div className="flex gap-2.5 items-center justify-center">
            <Chip
              label={launchpad.status.toUpperCase()}
              sx={{
                backgroundColor:
                  launchpad.status === "active" ? "#2ecc71" : "#e74c3c",
                color: "white",
                fontWeight: "bold",
                margin: "10px 0",
              }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => onReadMore(launchpad.id)}
              sx={{
                backgroundColor: "#ffcc00",
                color: "black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#e6b800" },
                margin: "10px 0",
              }}
            >
              Read More
            </Button>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default LaunchpadCard;