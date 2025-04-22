import FormSectionTitle from "../form/FormSectionTitle";
import ProfileInfo from "./ProfileInfo";

interface ProfileSectionProps {
  title: string;
  color: string;
  data: {
    title: string;
    value?: string | number | boolean | Record<string, any> | null;
  }[];
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  color,
  data,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-lg w-full p-4 shadow">
      <FormSectionTitle title={title} className={`${color} mb-3`} />
      {data.map((info, index) => {
        let displayValue: string;

        // Check for boolean values and display "Yes" or "No"
        if (typeof info.value === "boolean") {
          displayValue = info.value ? "Yes" : "No";
        }
        // Check if value is an object (e.g., emergencyContact)
        else if (typeof info.value === "object" && info.value !== null) {
          // Extract and format relevant object fields
          if (
            "fullName" in info.value &&
            "relationship" in info.value &&
            "mobile" in info.value
          ) {
            displayValue = `${info.value.fullName}, ${info.value.relationship}, ${info.value.mobile}`;
          } else {
            displayValue = JSON.stringify(info.value); // Fallback for unknown object types
          }
        }
        // Handle other data types (string, number, null)
        else {
          displayValue =
            info.value !== undefined && info.value !== null
              ? String(info.value)
              : "N/A";
        }

        return (
          <ProfileInfo
            key={index}
            spanTitle={info.title}
            spanInfo={displayValue}
          />
        );
      })}
    </div>
  );
};

export default ProfileSection;
