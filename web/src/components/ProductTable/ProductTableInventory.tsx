"use client";
import { useEffect, useState } from "react";
import ActionMenu from "../ActionMenu/ActionMenu";
import mockProduct from "@/types/mockproduct";
import { IoIosArrowRoundUp } from "react-icons/io";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import ProductFilterInventory from "../ProductFilter/ProductFilterInventory";

const ProductTableInventory = () => {
  const [products, setProducts] = useState(mockProduct());
  const [filteredProducts, setFilteredProducts] = useState(products); 
  const [editingId, setEditingId] = useState<number | null>(null);

  const [filter, setFilter] = useState("");
  const [subFilter, setSubFilter] = useState("");

  useEffect(() => {
    let filtered = products;

    if (filter === "categoría" && subFilter) {
      filtered = products.filter((p) => p.categoria === subFilter);
    }
    if (filter === "precio" && subFilter) {
      const [min, max] = subFilter.split("-").map(Number);
      filtered = products.filter((p) => {
        return max ? p.precio >= min && p.precio <= max : p.precio >= min;
      });
    }
    if (filter === "stock" && subFilter) {
      filtered = products.filter((p) => p.estado === subFilter);
    }

    setFilteredProducts(filtered);
  }, [filter, subFilter, products]);

  const handleEdit = (id: number) => setEditingId(id);
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
    <div>
      <div className='flex items-center mx-6 p-3'>
            <div className='flex items-center h-7'>
                <HiOutlineMagnifyingGlass className='mx-3'/>
                <input type='text' placeholder='Buscar producto' className='border rounded-md p-1  h-7' />
            </div>
            <div className='flex items-center border border-gray-300 rounded-md p-1 h-7 mx-4'>
            <ProductFilterInventory setFilter={setFilter} setSubFilter={setSubFilter} />
            </div>
        </div>
        <div>
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
        {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
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
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No hay productos que coincidan con el filtro seleccionado.
              </td>
            </tr>
          )}
        </tbody>
        </table>
        </div>
        <div>
        <button
          className="bottom-4 right-4 p-3 cursor-pointer flex"
        >
          <IoIosArrowRoundUp className="h-6 w-6" />
          <h3>Volver</h3>
        </button>
      </div>
    </div>
  );
}

export default ProductTableInventory;


