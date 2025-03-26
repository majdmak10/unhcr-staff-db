"use client";

import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface ProfileMapProps {
  latitude: number | null;
  longitude: number | null;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
};

const ProfileMap: React.FC<ProfileMapProps> = ({ latitude, longitude }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) return <div>Loading map...</div>;
  if (latitude === null || longitude === null)
    return <div>No location selected</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={15}
      center={{ lat: latitude, lng: longitude }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

export default ProfileMap;
