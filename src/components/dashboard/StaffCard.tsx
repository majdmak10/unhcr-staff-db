interface StaffCardProps {
  title: string;
}

const StaffCard = ({ title }: StaffCardProps) => {
  return (
    <div className="">
      <span>{title}</span>
    </div>
  );
};

export default StaffCard;
