import React from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

const MapComponent = ({ lat, lng }) => {
  const mapStyles = {
    height: "150px",
    width: "100%",
    cursor: "pointer",
  };

  const defaultCenter = {
    lat: lat,
    lng: lng,
  };

  const handleMapClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <LoadScriptNext googleMapsApiKey="AIzaSyBODVkJxALWzkaft_GE0wv2CHyJyE473Uk">
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={defaultCenter}
        zoom={10}
        onClick={handleMapClick}
        options={{
          disableDefaultUI: true,
        }}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapComponent;
