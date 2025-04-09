"use client";

import { routes } from "@/routes/routes";
import Link from "next/link";
import { BiBarChart } from "react-icons/bi";
import { MdBusinessCenter } from "react-icons/md";

const SideBarSuperAdmin = () => {
  return (
    <div className="flex flex-col text-lg gap-3 bg-custom-grisClarito w-56 h-screen p-3 shrink-0">
      <div className="flex flex-col gap-1 mt-5">
        <h2 className="text-custom-textSubtitle">GENERAL</h2>
        <Link href={`${routes.superadminDashboard}/users`}>
          <div className="flex items-center gap-2 pl-2">
            <MdBusinessCenter />
            <h3>Volver a Principal</h3>
          </div>
        </Link>
        <Link href={`${routes.superadminDashboard}/statistics`}>
          <div className="flex items-center gap-2 pl-2">
            <BiBarChart />
            <h3>Estadisticas</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBarSuperAdmin;
