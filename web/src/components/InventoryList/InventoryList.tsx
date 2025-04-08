"use client";
import { useEffect } from "react";
import { getAllInventory } from "@/services/user/inventory";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import Link from "next/link";
import { LuClipboardList } from "react-icons/lu";

const InventoryList = () => {
  const { token } = useAuth();
  const { 
    businessId, 
    inventories, 
    setInventories,
    inventoryId,
    saveInventoryId
  } = useBusiness();

  useEffect(() => {
    const loadInventories = async () => {
      if (!token || !businessId) return;
      
      try {
        const data = await getAllInventory(token, businessId);
        setInventories(data);
        
        if (inventoryId && !data.some((inv: { id: string }) => inv.id === inventoryId)) {
          saveInventoryId(inventoryId);
        }
      } catch (error) {
        console.warn("Error cargando locales:", error);
      }
    };

    loadInventories();
  }, [token, businessId]);

  const isLoading = !businessId || (businessId && inventories === undefined);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 pl-2">
        <div className="flex items-center gap-2">
          <LuClipboardList />
          <h3>Inventario de locales</h3>
        </div>
      </div>
    );
  }

  if (!businessId) {
    return (
      <div className="flex items-center gap-2 pl-2">
        <LuClipboardList />
        <h3>Inventario de locales</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 pl-2">
        <LuClipboardList />
        <h3>Inventarios de locales</h3>
      </div>

      <div className="pl-6 max-h-60 overflow-y-auto">
        {inventories.length > 0 ? (
          inventories.map((inventory) => (
            <Link 
              key={inventory.id} 
              href={`/dashboard/inventory/${inventory.id}`}
              onClick={() => saveInventoryId(inventory.id)}
            >
              <div
                className={`
                  flex items-center gap-2 pl-2 p-1 rounded-md
                  ${inventoryId === inventory.id ? 'bg-custom-GrisOscuro font-semibold text-primary' : 'hover:bg-custom-grisClarito'}
                  cursor-pointer
                `}
              >
                <span className="truncate">{inventory.name}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-sm text-custom-textGris italic pl-2">
            No hay locales creados
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryList;