import SideBar from "@/components/SideBar/SideBar";
import { BusinessProvider } from "@/context/BusinessContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <BusinessProvider>
        <SideBar />
        <div className="w-full">{children}</div>
      </BusinessProvider>
    </div>
  );
}
