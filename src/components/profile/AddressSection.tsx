import FormSectionTitle from "../form/FormSectionTitle";
import ProfileInfo from "./ProfileInfo";
import ProfileMap from "./ProfileMap";
import { convertToDMS } from "@/utils/convertToDMS";

interface AddressSectionProps {
  address?: {
    neighborhood?: string;
    street?: string;
    building?: string;
    floor?: string;
    apartment?: string;
    latitude?: string;
    longitude?: string;
  };
}

const AddressSection: React.FC<AddressSectionProps> = ({ address }) => {
  const rawLat = address?.latitude || "";
  const rawLng = address?.longitude || "";

  const latitude = !isNaN(parseFloat(rawLat)) ? parseFloat(rawLat) : null;
  const longitude = !isNaN(parseFloat(rawLng)) ? parseFloat(rawLng) : null;

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white rounded-lg w-full p-4 shadow">
      <div>
        <FormSectionTitle
          title="Address Information"
          className="text-mPurple mb-3"
        />
        <ProfileInfo
          spanTitle="Neighborhood:"
          spanInfo={address?.neighborhood ?? "N/A"}
        />
        <ProfileInfo spanTitle="Street:" spanInfo={address?.street ?? "N/A"} />
        <ProfileInfo
          spanTitle="Building:"
          spanInfo={address?.building ?? "N/A"}
        />
        <ProfileInfo spanTitle="Floor:" spanInfo={address?.floor ?? "N/A"} />
        <ProfileInfo
          spanTitle="Apartment:"
          spanInfo={address?.apartment ?? "N/A"}
        />
        <ProfileInfo
          spanTitle="Latitude:"
          spanInfo={latitude !== null ? convertToDMS(latitude, true) : "N/A"}
        />
        <ProfileInfo
          spanTitle="Longitude:"
          spanInfo={longitude !== null ? convertToDMS(longitude, false) : "N/A"}
        />
      </div>
      <div className="w-full md:col-span-2">
        <ProfileMap latitude={latitude} longitude={longitude} />
      </div>
    </main>
  );
};

export default AddressSection;
