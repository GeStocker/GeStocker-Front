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
        {/* Sidebar fijo */}
        <div className="shrink-0">
          {/* Contenedor que evita que el SideBar se encoja */}
          <SideBar />
        </div>
        {/* Contenido principal (se ajusta al espacio restante) */}
        <div className="flex-1 overflow-auto" id="main-content" >
          {/* Permite scroll si el contenido es largo */}
          {children}
        </div>
      </BusinessProvider>
    </div>
  );
}
