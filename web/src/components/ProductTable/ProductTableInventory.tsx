"use client";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IStockProduct } from "@/types/interface";
import ScrollToTopButton from "../ScrollTop/ScrollToTopButton";

interface ProductTableInventoryProps {
  products: IStockProduct[];
  onSearchChange: (value: string) => void; 
  searchValue: string;
}

const ProductTableInventory: React.FC<ProductTableInventoryProps> = ({ products,onSearchChange, 
  searchValue  }) => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center border rounded-md p-2 w-1/3">
          <HiOutlineMagnifyingGlass className="mr-2" />
          <input
            type="text"
            placeholder="Buscar producto"
            className="w-full outline-none"
            value={searchValue} 
            onChange={(e) => onSearchChange(e.target.value)} 
          />
        </div>
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border text-left">Imagen</th>
              <th className="p-2 border text-left">Producto</th>
              <th className="p-2 border text-left">Categoría</th>
              <th className="py-2 border text-left">Stock</th>
              <th className="py-2 border text-center">Estado Stock</th>
              <th className="p-2 border text-left">Precio</th>
              <th className="p-2 border text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border">
                  <td className="p-2">
                    <img
                      src={product.product.img|| "default-image-url.png"}
                      alt={product.product.name}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="p-2">{product.product.name}</td>
                  <td className="px-4 py-3">{product.product.category.name}</td>
                  <td className="p-2">{product.stock ?? "No disponible"}</td>
                  <td className={`p-2 text-center font-semibold ${
                      product.stock === 0
                        ? "text-red-600" 
                        : product.stock < 10
                        ? "text-yellow-600" 
                        : "text-green-600" 
                    }`}
                  >
                    {product.stock === 0
                      ? "Sin stock"
                      : product.stock < 10
                      ? "Stock bajo"
                      : "Stock alto"}
                  </td>
                  <td className="p-2">
                    {product.price ? `$${product.price}` : "No disponible"}
                  </td>
                  <td className={`p-2 text-center font-semibold ${
                    product.product.isActive ? "text-green-600" : "text-red-600"
                  }`}>
                    {product.product.isActive ? "Activo" : "Inactivo"}
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
      <div className="mt-4">
        <div className="flex justify-between mt-4">
          <ScrollToTopButton/>
        </div>
      </div>
    </div>
  );
};

export default ProductTableInventory;
