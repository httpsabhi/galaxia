import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const issIcon = new L.divIcon({
  className: "animated-iss",
  html: `<div class="relative w-16 h-16">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg" 
      class="animate-spin-slow w-full h-full" alt="ISS" />
    </div>`,
  iconSize: [74, 74],
  iconAnchor: [32, 32],
  popupAnchor: [0, -32],
});

const ChangeView = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
    return undefined; // ✅ Explicitly returning nothing
  }, [center, map]);

  return null;
};

const IssTracker2D = ({ position, issData, pathData, showPath }) => {
  return (
    <MapContainer
      center={[position.lat, position.lon]}
      zoom={3}
      scrollWheelZoom
      className="h-[80vh] w-full rounded-lg shadow-lg z-40"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showPath && (
        <Polyline
          positions={pathData}
          color="yellow"
          weight={2}
          dashArray="5,5"
        />
      )}
      <ChangeView center={[position.lat, position.lon]} />
      <Marker position={[position.lat, position.lon]} icon={issIcon}>
        <Popup className="bg-gray-800 text-white p-3 rounded-lg shadow-lg">
          <p className="text-lg font-bold">🛰 International Space Station</p>
          <p>
            📍 Lat: {position.lat.toFixed(2)}, Lon: {position.lon.toFixed(2)}
          </p>
          <p>🚀 Speed: {issData.velocity} km/h</p>
          <p>📡 Altitude: {issData.altitude} km</p>
          <p>🌍 Country: {issData.country}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default IssTracker2D;
