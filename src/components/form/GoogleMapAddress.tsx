"use client";

import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface GoogleMapAddressProps {
  onAddressSelect: (lat: string, lng: string) => void; // DMS-formatted latitude/longitude
}

const convertToDMSWithDirection = (
  decimal: number,
  isLatitude: boolean
): string => {
  const degrees = Math.floor(Math.abs(decimal));
  const minutesDecimal = (Math.abs(decimal) - degrees) * 60;
  const minutes = Math.floor(minutesDecimal);
  const seconds = ((minutesDecimal - minutes) * 60).toFixed(2);

  const direction =
    decimal >= 0 ? (isLatitude ? "N" : "E") : isLatitude ? "S" : "W";

  return `${degrees}°${minutes}'${seconds}"${direction}`;
};

const GoogleMapAddress: React.FC<GoogleMapAddressProps> = ({
  onAddressSelect,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const onMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setSelectedPosition({ lat, lng });

        // Convert to DMS with direction and pass to the parent component
        onAddressSelect(
          convertToDMSWithDirection(lat, true), // Latitude
          convertToDMSWithDirection(lng, false) // Longitude
        );
      }
    },
    [onAddressSelect]
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      // mapContainerClassName="w-full h-[300px] md:h-full md:col-span-2 rounded-lg border border-gray-300"
      zoom={10}
      center={{ lat: 36.2021, lng: 37.1343 }}
      onClick={onMapClick}
    >
      {selectedPosition && <Marker position={selectedPosition} />}
    </GoogleMap>
  );
};

export default GoogleMapAddress;
