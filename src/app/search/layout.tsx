import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata = {
  title: {
    template: "%s",
    default: "Search | Admin Dashboard",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <DashboardLayout>{children}</DashboardLayout>
);

export default Layout;
