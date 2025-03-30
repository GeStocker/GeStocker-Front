import { Button } from "@/components/ui/button";
import React from "react";

const CollaboratorsView = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl text-gray-950 font-bold">Colaboradores</h1>
      <h2 className="text-xl text-custom-textGris">
        Gestiona los usuarios que tienen acceso al sistema
      </h2>
      <Button size="lg">
        Añadir colaborador
      </Button>
    </div>
  );
};

export default CollaboratorsView;
