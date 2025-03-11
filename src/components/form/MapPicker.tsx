"use client";

import React from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

type MapPickerProps = {
  latitude: string;
  longitude: string;
  onLocationChange: (lat: string, lng: string) => void;
};

const containerStyle = {
  width: "100%",
  height: "100%",
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
};

// Set default center to Aleppo, Syria
const defaultCenter = {
  lat: 36.2021, // Aleppo, Syria latitude
  lng: 37.1343, // Aleppo, Syria longitude
};

const MapPicker: React.FC<MapPickerProps> = ({
  latitude,
  longitude,
  onLocationChange,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  const center =
    latitude && longitude
      ? { lat: parseFloat(latitude), lng: parseFloat(longitude) }
      : defaultCenter;

  const handleClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat().toString();
      const lng = event.latLng.lng().toString();
      onLocationChange(lat, lng);
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={handleClick}
    >
      {latitude && longitude ? (
        <Marker
          position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
        />
      ) : (
        // If no location is set, display marker at defaultCenter
        <Marker position={defaultCenter} />
      )}
    </GoogleMap>
  );
};

export default MapPicker;
