"use client";
import { useState } from "react";
import ActionMenu from "../ActionMenu/ActionMenu";
import mockProduct from "@/types/mockproduct";

function ProductTable() {
  const [products, setProducts] = useState(mockProduct());
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditingId(id); 
  };

  const handleSave = () => {
    setEditingId(null);
    console.log("Productos actualizados:", products); 
  };

  const handleChange = (id: number, field: "precio" | "stock", value: string) => {
    const numericValue = value === "" ? "" : parseFloat(value); 
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, [field]: numericValue }
          : product
      )
    );
  };
  

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border text-left">Producto</th>
          <th className="p-2 border text-left">Categoría</th>
          <th className="py-2 border text-left">Stock</th>
          <th className="p-2 border text-left">Precio</th>
          <th className="p-2 border">Estado</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border">
            <td className="p-2">{product.producto}</td>
            <td className="px-4 py-3">{product.categoria}</td>
            <td className="p-2">
              {editingId === product.id ? (
                <input
                type="number"
                value={isNaN(product.stock) ? "" : product.stock} 
                onChange={(e) =>
                  handleChange(product.id, "stock", e.target.value)
                }
                className="border p-1 w-16"
                min="0"
              />
              ) : (
                product.stock
              )}
            </td>
            <td className="p-2">
            {editingId === product.id ? (
                <input
                  type="number"
                  value={product.precio === null || product.precio === undefined ? "" : product.precio.toString()} 
                  onChange={(e) =>
                    handleChange(product.id, "precio", e.target.value)
                  }
                  className="border p-1 w-20"
                  min="0"
                />
              ) : (
                `$${product.precio}`
              )}
            </td>
            <td
                className={`px-4 py-3 text-center font-semibold ${
                  product.estado === "Stock Alto"
                    ? "text-green-600"
                    : product.estado === "Stock Bajo"
                    ? "text-yellow-500"
                    : "text-red-600"
                }`}
              >
                {product.estado}
              </td>
            <td className="p-2 text-center">
              {editingId === product.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={handleSave}>
                  Guardar
                </button>
              ) : (
                <ActionMenu onEdit={() => handleEdit(product.id)}/>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
