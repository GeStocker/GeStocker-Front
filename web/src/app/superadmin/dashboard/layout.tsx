import SideBarSuperAdmin from "@/components/SideBar/SideBarSuperAdmin";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
        <div className="shrink-0">
          <SideBarSuperAdmin />
        </div>
        <div className="flex-1 overflow-auto" id="main-content" >
          {children}
        </div>
    </div>
  );
}
