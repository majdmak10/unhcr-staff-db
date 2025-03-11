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
  // Use the provided initial values for editing
  const [latitude, setLatitude] = useState(initialLatitude);
  const [longitude, setLongitude] = useState(initialLongitude);

  // State for address fields
  const [address, setAddress] = useState({
    neighborhood: initialAddress?.neighborhood || "",
    street: initialAddress?.street || "",
    building: initialAddress?.building || "",
    floor: initialAddress?.floor || "",
    apartment: initialAddress?.apartment || "",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
      {/* Display section: show DMS values and include hidden inputs for submission */}
      <div className="flex flex-wrap justify-between gap-4">
        {/* Address Fields */}
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

        {/* Latitude & Longitude Fields (DMS Format) */}
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-500 mb-2">
            Latitude
          </label>
          <input
            type="text"
            aria-label="latitude"
            value={latitude ? convertToDMS(parseFloat(latitude), true) : ""}
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
            value={longitude ? convertToDMS(parseFloat(longitude), false) : ""}
            readOnly
            className="block text-sm w-full rounded-md ring-[1.5px] ring-gray-300 hover:ring-mBlue focus:ring-mBlue focus:outline-none p-2 pr-10 transition-all duration-200 h-10"
          />
        </div>

        {/* Hidden Inputs for Form Submission */}
        <input type="hidden" name="latitude" value={latitude} />
        <input type="hidden" name="longitude" value={longitude} />
      </div>

      {/* Right Section: Map Picker */}
      <div className="w-full h-[300px] md:h-full md:col-span-2">
        <MapPicker
          latitude={latitude}
          longitude={longitude}
          onLocationChange={(lat, lng) => {
            setLatitude(lat);
            setLongitude(lng);
          }}
        />
      </div>
    </div>
  );
};

export default MapEditor;
