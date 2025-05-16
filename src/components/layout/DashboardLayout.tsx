import Footer from "@/components/layout/Footer";
import Menu from "@/components/layout/Menu";
import MetadataWatcher from "@/components/layout/MetadataWatcher";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen grid grid-cols-[14%_86%] md:grid-cols-[8%_92%] lg:grid-cols-[16%_84%] xl:grid-cols-[14%_86%] grid-rows-[auto_1fr_auto]">
      {/* LEFT (SIDEBAR) */}
      <aside className="p-4 bg-white">
        {/* LOGO */}
        <Link
          href="/"
          className="flex justify-center items-center lg:justify-start mb-2"
        >
          {/* Large logo for large screens */}
          <Image
            src="/logos/logo_lg.png"
            alt="logo"
            width={150}
            height={50}
            className="hidden lg:block"
          />

          {/* Small logo for small screens */}
          <Image
            src="/logos/logo_sm.png"
            alt="logo small"
            width={50}
            height={50}
            className="block lg:hidden"
          />
        </Link>
        {/* MENU */}
        <Menu />
      </aside>

      {/* RIGHT (MAIN CONTENT) */}
      <section className="p-3 grid grid-rows-[auto_1fr_auto] overflow-auto hide-scrollbar gap-3">
        <Navbar />
        <div className="overflow-auto">{children}</div>
        <Footer />
      </section>

      <MetadataWatcher eventName="dashboardMetadataChange" />
    </main>
  );
};

export default DashboardLayout;
