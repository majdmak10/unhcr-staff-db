import React, { useMemo } from "react";
import Link from "next/link";

const UsefulLinks: React.FC = () => {
  // Memoized link data to prevent unnecessary re-renders
  const linkSections = useMemo(
    () => [
      {
        title: "UNHCR Links",
        links: [
          {
            href: "https://wd3.myworkday.com/unhcr/d/home.htmld",
            label: "Workday",
          },
          {
            href: "https://prv.unhcrsyria.org/Home/",
            label: "UNHCR Syria Portal",
          },
          { href: "https://mip-portal.unhcr.org/", label: "UNHCR Medical" },
        ],
      },
      {
        title: "Useful Links",
        links: [
          {
            href: "https://dss.un.org/TRIP/TRIP-My-Travel-Requests",
            label: "TRIP",
          },
          { href: "https://unbooking.org/en/", label: "UN Booking Hub" },
          { href: "https://www.unfcu.org/", label: "UNFCU" },
        ],
      },
    ],
    []
  );

  return (
    <main className="flex flex-col gap-3">
      {linkSections.map((section) => (
        <section
          key={section.title}
          className="flex flex-col gap-2 text-sm p-5 bg-white rounded-lg"
        >
          <h2 className="font-bold text-sm">{section.title}</h2>
          {section.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </main>
  );
};

export default UsefulLinks;
