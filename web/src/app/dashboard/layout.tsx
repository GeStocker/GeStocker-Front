import SideBar from "@/components/SideBar/SideBar";
import { BusinessProvider } from "@/context/BusinessContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <BusinessProvider>
        <div className="shrink-0">
          <SideBar />
        </div>
        <div className="flex-1 overflow-auto" id="main-content" >
          {children}
        </div>
      </BusinessProvider>
    </div>
  );
}
