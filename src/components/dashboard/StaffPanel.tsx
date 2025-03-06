interface StaffPanelProps {
  title: string;
}

const StaffPanel = ({ title }: StaffPanelProps) => {
  return (
    <div className="">
      <span>{title}</span>
    </div>
  );
};

export default StaffPanel;
