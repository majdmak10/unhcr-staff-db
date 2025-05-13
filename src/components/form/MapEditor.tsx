"use client";

import { useState } from "react";
import MapPicker from "./MapPicker";
import { convertToDMS } from "@/utils/convertToDMS";
import InputField from "./InputFiled";

interface MapEditorProps {
  initialLatitude: string;
  initialLongitude: string;
  initialAddress?: {
    neighborhood?: string;
    street?: string;
    building?: string;
    floor?: string;
    apartment?: string;
  };
}

const MapEditor: React.FC<MapEditorProps> = ({
  initialLatitude,
  initialLongitude,
  initialAddress,
}) => {
  const [latitude, setLatitude] = useState(initialLatitude);
  const [longitude, setLongitude] = useState(initialLongitude);

  const [address, setAddress] = useState({
    neighborhood: initialAddress?.neighborhood || "",
    street: initialAddress?.street || "",
    building: initialAddress?.building || "",
    floor: initialAddress?.floor || "",
    apartment: initialAddress?.apartment || "",
  });

  // Format latitude and longitude for display
  const formatDMS = (value: string, isLat: boolean): string => {
    const num = parseFloat(value);
    return !isNaN(num) ? convertToDMS(num, isLat) : "N/A";
  };

  const latitudeDisplay = formatDMS(latitude, true);
  const longitudeDisplay = formatDMS(longitude, false);

  // Fallback to Aleppo for map display only
  const mapLat = !isNaN(parseFloat(latitude)) ? latitude : "36.2021";
  const mapLng = !isNaN(parseFloat(longitude)) ? longitude : "37.1343";

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
      {/* Address Fields */}
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
          label="Neighborhood"
          id="neighborhood"
          name="addressNeighborhood"
          value={address.neighborhood}
          onChange={(e) =>
            setAddress({ ...address, neighborhood: e.target.value })
          }
        />
        <InputField
          label="Street"
          id="street"
          name="addressStreet"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
        <InputField
          label="Building"
          id="building"
          name="addressBuilding"
          value={address.building}
          onChange={(e) => setAddress({ ...address, building: e.target.value })}
        />
        <InputField
          label="Floor"
          id="floor"
          name="addressFloor"
          value={address.floor}
          onChange={(e) => setAddress({ ...address, floor: e.target.value })}
        />
        <InputField
          label="Apartment"
          id="apartment"
          name="addressApartment"
          value={address.apartment}
          onChange={(e) =>
            setAddress({ ...address, apartment: e.target.value })
          }
        />

        {/* DMS Fields */}
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-500 mb-2">
            Latitude
          </label>
          <input
            type="text"
            aria-label="latitude"
            value={latitudeDisplay}
            readOnly
            className="block text-sm w-full rounded-md ring-[1.5px] ring-gray-300 hover:ring-mBlue focus:ring-mBlue focus:outline-none p-2 pr-10 transition-all duration-200 h-10"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-500 mb-2">
            Longitude
          </label>
          <input
            type="text"
            aria-label="longitude"
            value={longitudeDisplay}
            readOnly
            className="block text-sm w-full rounded-md ring-[1.5px] ring-gray-300 hover:ring-mBlue focus:ring-mBlue focus:outline-none p-2 pr-10 transition-all duration-200 h-10"
          />
        </div>

        {/* Hidden Inputs for Submission */}
        <input type="hidden" name="latitude" value={latitude} />
        <input type="hidden" name="longitude" value={longitude} />
      </div>

      {/* Map Picker */}
      <div className="w-full h-[300px] md:h-full md:col-span-2">
        <MapPicker
          latitude={mapLat}
          longitude={mapLng}
          onLocationChange={(lat, lng) => {
            setLatitude(lat);
            setLongitude(lng);
          }}
        />
      </div>
    </main>
  );
};

export default MapEditor;
