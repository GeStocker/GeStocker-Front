"use client";
import { IoIosArrowRoundUp } from "react-icons/io";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

interface Product {
  id: number;
  producto: string;
  categoria: string;
  stock: number;
  precio: number;
  estado: string;
}

interface Props {
  products: Product[];
}

const ProductTableInventory = ({ products }: Props) => {
  return (
    <div className="p-4">
      {/* Barra de búsqueda */}
      <div className="flex items-center mb-4">
        <div className="flex items-center border rounded-md p-2 w-1/3">
          <HiOutlineMagnifyingGlass className="mr-2" />
          <input
            type="text"
            placeholder="Buscar producto"
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border text-left">Imagen</th>
              <th className="p-2 border text-left">Producto</th>
              <th className="p-2 border text-left">Descripción</th>
              <th className="p-2 border text-left">Categoría</th>
              <th className="p-2 border text-left">Stock</th>
              <th className="p-2 border text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border">
                  <td className="p-2">{product.producto}</td>
                  <td className="p-2">{product.description}</td>
                  <td className="p-2">{product.category_name || "Sin categoría"}</td>
                  <td className="p-2">{product.inventoryProduct_stock ?? "No disponible"}</td>
                  <td className={`p-2 text-center font-semibold ${
                    product.product_isActive ? "text-green-600" : "text-red-600"
                  }`}>
                    {product.product_isActive ? "Activo" : "Inactivo"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4">No hay productos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botón de volver */}
      <div className="mt-4">
        <button className="flex items-center bg-gray-100 p-2 rounded-md cursor-pointer">
          <IoIosArrowRoundUp className="h-6 w-6 mr-2" />
          <h3>Volver</h3>
        </button>
      </div>
    </div>
  );
};

export default ProductTableInventory;
