import StaffCard from "@/components/dashboard/StaffCard";
import StaffPanel from "@/components/dashboard/StaffPanel";
import UsefulLinks from "@/components/dashboard/UsefulLinks";

const Dashboard = () => {
  return (
    <main className="grid gap-3 grid-cols-1 md:grid-cols-[4fr_1fr]">
      {/* LEFT SECTION */}
      <section className="grid gap-8">
        {/* STAFF CARDS */}
        <div className="grid gap-2 lg:grid-cols-3">
          <StaffCard title="Total Staff" />
          <StaffCard title="Staff Inside Aleppo" />
          <StaffCard title="Staff Outside Aleppo" />
        </div>

        {/* STAFF PANELS */}
        <div className="grid gap-3">
          <StaffPanel title="Total Staff Panel" />
          <StaffPanel title="Staff Inside Aleppo Panel" />
          <StaffPanel title="Staff Outside Aleppo Panel" />
        </div>
      </section>

      {/* RIGHT SECTION */}
      <aside className="grid">
        <UsefulLinks />
      </aside>
    </main>
  );
};

export default Dashboard;
