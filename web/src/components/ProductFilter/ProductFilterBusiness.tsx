"use client";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";

interface ProductFilterProps {
  setFilter: (filter: string) => void;
  setSubFilter: (subFilter: string) => void;
}

const ProductFilterBusiness = ({ setFilter, setSubFilter }: ProductFilterProps) => {
  const [localFilter, setLocalFilter] = useState("");

  const categories = ["Electrónica", "Accesorios", "Almacenamiento"];
  const stockStates = ["Stock Alto", "Stock Bajo", "Sin Stock"];

  return (
    <div className="flex items-center justify-center text-center h-7">
        <CiFilter className="text-gray-600" />
        <select
          value={localFilter}
          onChange={(e) => {
            const value = e.target.value;
            setLocalFilter(value);
            setFilter(value);
            setSubFilter(""); 
          }}
          className=" flex items-center p-1outline-none"
        >
          <option value="">Filtrar por</option>
          <option value="categoría">Categoría</option>
          <option value="stock">Estado de stock</option>
        </select>
      {localFilter && (
        <select
          onChange={(e) => setSubFilter(e.target.value)}
          className="flex items-center p-1 outline-none"
        >
          <option value="">Selecciona una opción</option>
          {localFilter === "categoría" &&
            categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          {localFilter === "stock" &&
            stockStates.map((state) => <option key={state} value={state}>{state}</option>)}
        </select>
      )}
    </div>
  );
};

export default ProductFilterBusiness;
