"use client";
import React from "react";
import { useBusiness } from "@/context/BusinessContext";
import InventoryView from "@/views/Dashboard/inventory/InventoryView";

const InventoryDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { saveInventoryId } = useBusiness();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
        saveInventoryId (id);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Cargando locales...</div>;
  }

  return <InventoryView />;
};

export default InventoryDetailsPage;