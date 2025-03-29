"use client";
import { useEffect, useState } from "react";
import { getAllInventory } from "@/services/user/inventory";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { LuClipboardList } from "react-icons/lu";

const InventoryList = () => {
  const { token } = useAuth();
  const { businessId } = useBusiness();
//   const router = useRouter();
  
  const [inventories, setInventories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchInventories = async () => {
      if (!token || !businessId) return;
      try {
        const data = await getAllInventory(token, businessId);
        setInventories(data);
      } catch (error) {
        console.error("Error al obtener los inventarios:", error);
      }
    };

    fetchInventories();
  }, [token, businessId]);

  return (
    <div className="flex flex-col gap-1 mt-5">
        <div className="flex items-center gap-2 pl-2">
          <LuClipboardList />
          <h3>Inventarios</h3>
        </div>

      {inventories.length > 0 && (
        <div className="pl-6">
          {inventories.map((inventory) => (
            <Link key={inventory.id} href={`/dashboard/inventory/${inventory.id}`}>
              <div className="flex items-center gap-2 pl-2 hover:bg-gray-200 cursor-pointer rounded-md p-1">
                <h3>{inventory.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryList;
