"use client";
import React from "react";
import { useBusiness } from "@/context/BusinessContext";
import BusinessView from "@/views/Dashboard/Business/BusinessView";

const BusinessDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { saveBusinessId } = useBusiness();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      saveBusinessId(id);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Cargando negocio...</div>;
  }

  return <BusinessView />;
};

export default BusinessDetailsPage;