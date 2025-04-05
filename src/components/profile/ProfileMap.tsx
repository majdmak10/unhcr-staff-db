"use client";

import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface ProfileMapProps {
  latitude: number | null;
  longitude: number | null;
}

const ProfileMap: React.FC<ProfileMapProps> = ({ latitude, longitude }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const fallbackCoords = { lat: 36.2021, lng: 37.1343 }; // Aleppo

  const lat = latitude ?? fallbackCoords.lat;
  const lng = longitude ?? fallbackCoords.lng;

  if (!isLoaded) return <div>Loading map...</div>;

  const showNotice = latitude === null || longitude === null;

  return (
    <div className="relative w-full h-[300px] border border-gray-300 rounded-lg overflow-hidden">
      {showNotice && (
        <div className="absolute top-2 left-2 z-10 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded shadow">
          No location selected — showing default (Aleppo)
        </div>
      )}
      <GoogleMap
        mapContainerClassName="w-full h-full"
        zoom={15}
        center={{ lat, lng }}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </div>
  );
};

export default ProfileMap;
