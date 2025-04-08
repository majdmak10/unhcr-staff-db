"use client";

import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { parseCoordinate } from "@/utils/parseCoordinate";

interface ProfileMapProps {
  latitude: number | string | null;
  longitude: number | string | null;
}

const ProfileMap: React.FC<ProfileMapProps> = ({ latitude, longitude }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const fallbackCoords = { lat: 36.2021, lng: 37.1343 }; // Aleppo fallback

  const parsedLat = parseCoordinate(latitude);
  const parsedLng = parseCoordinate(longitude);

  const isValidLatLng =
    parsedLat !== null &&
    parsedLng !== null &&
    isFinite(parsedLat) &&
    isFinite(parsedLng);

  const center = isValidLatLng
    ? { lat: parsedLat as number, lng: parsedLng as number }
    : fallbackCoords;

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="relative w-full h-[300px] border border-gray-300 rounded-lg overflow-hidden">
      {!isValidLatLng && (
        <div className="absolute top-2 left-2 z-10 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded shadow">
          No location selected — showing default (Aleppo)
        </div>
      )}
      <GoogleMap
        mapContainerClassName="w-full h-full"
        zoom={15}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default ProfileMap;
