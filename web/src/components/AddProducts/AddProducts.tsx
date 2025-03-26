import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const AddProducts = () => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <h1 className="text-2xl font-semibold text-left">Añadir productos</h1>
      <Tabs defaultValue="seleccionar" className="w-4/5 p-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="seleccionar">Seleccionar productos</TabsTrigger>
          <TabsTrigger value="excel">Subir excel</TabsTrigger>
        </TabsList>
        <TabsContent value="seleccionar">
            <div className="flex flex-col gap-1">
                
            </div>
        </TabsContent>
        <TabsContent value="excel">
        <p>excel</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddProducts;
