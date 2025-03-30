"use client";
import { IoIosArrowRoundUp } from "react-icons/io";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IStockProduct } from "@/types/interface";

interface ProductTableInventoryProps {
  products: IStockProduct[];
}

const ProductTableInventory: React.FC<ProductTableInventoryProps> = ({ products }) => {
  return (
    <div>
      <div className="flex items-center mx-6 p-3">
        <div className="flex items-center h-7">
          <HiOutlineMagnifyingGlass className="mx-3" />
          <input
            type="text"
            placeholder="Buscar producto"
            className="border rounded-md p-1 h-7"
          />
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
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border">
                  <td className="p-2">{product.product.name}</td>
                  <td className="px-4 py-3">{product.product.category.name}</td>
                  <td className="p-2">{product.stock ?? "No disponible"}</td>
                  <td className="p-2">
                    {product.price ? `$${product.price}` : "No disponible"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No hay productos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <button className="bottom-4 right-4 p-3 cursor-pointer flex">
          <IoIosArrowRoundUp className="h-6 w-6" />
          <h3>Volver</h3>
        </button>
      </div>
    </div>
  );
};

export default ProductTableInventory;
