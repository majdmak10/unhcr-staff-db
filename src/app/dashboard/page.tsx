"use client";

import { useEffect, useState } from "react";
import StaffCard from "@/components/dashboard/StaffCard";
import StaffPanel from "@/components/dashboard/StaffPanel";
import UsefulLinks from "@/components/dashboard/UsefulLinks";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    total: null,
    insideDs: null,
    outsideDs: null,
  });

  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch("/api/staff/cards");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCounts({
          total: data.total,
          insideDs: data.insideDs,
          outsideDs: data.outsideDs,
        });
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    fetchCounts();
  }, []);

  return (
    <main className="grid gap-3 grid-cols-1 md:grid-cols-[4fr_1fr]">
      {/* LEFT SECTION */}
      <section className="grid gap-8">
        {/* STAFF CARDS */}
        <div className="grid gap-3 lg:grid-cols-3">
          <StaffCard
            title="Total Staff"
            number={counts.total}
            link="/dashboard/staff"
            iconType="total"
            status={status}
          />
          <StaffCard
            title="Staff Inside Aleppo"
            number={counts.insideDs}
            link="/dashboard/inside-ds"
            iconType="inside"
            status={status}
          />
          <StaffCard
            title="Staff Outside Aleppo"
            number={counts.outsideDs}
            link="/dashboard/outside-ds"
            iconType="outside"
            status={status}
          />
        </div>

        {/* STAFF PANELS */}
        <StaffPanel
          title="Total Staff Panel"
          fetchUrl="/api/staff/panels?type=total"
          type="total"
        />
        <StaffPanel
          title="Staff Inside Aleppo Panel"
          fetchUrl="/api/staff/panels?type=inside"
          type="inside"
        />
        <StaffPanel
          title="Staff Outside Aleppo Panel"
          fetchUrl="/api/staff/panels?type=outside"
          type="outside"
        />
      </section>

      {/* RIGHT SECTION */}
      <aside className="grid">
        <UsefulLinks />
      </aside>
    </main>
  );
};

export default Dashboard;
