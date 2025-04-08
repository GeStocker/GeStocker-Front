"use client";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IStockProduct } from "@/types/interface";
import ScrollToTopButton from "../ScrollTop/ScrollToTopButton";
import ActionMenu from "../ActionMenu/ActionMenu";

interface ProductTableInventoryProps {
  products: IStockProduct[];
  onSearchChange: (value: string) => void; 
  searchValue: string;
  onRemoveProduct: (productId: string) => void;
}

const ProductTableInventory: React.FC<ProductTableInventoryProps> = ({ products,onSearchChange, 
  searchValue, onRemoveProduct  }) => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center border rounded-md p-2 w-1/3">
          <HiOutlineMagnifyingGlass className="mr-2" />
          <input
            id="search"
            type="text"
            placeholder="Buscar producto"
            className="w-full outline-none"
            value={searchValue} 
            onChange={(e) => onSearchChange(e.target.value)} 
          />
        </div>
      </div>
      <div>
        <table className="w-full border-collapse border  border-custom-grisClarito">
          <thead>
            <tr className="bg-custom-grisClarito">
              <th className="p-2 border text-center">Imagen</th>
              <th className="p-2 border text-center">Producto</th>
              <th className="p-2 border text-center">Categoría</th>
              <th className="py-2 border text-center">Stock</th>
              <th className="py-2 border text-center">Estado Stock</th>
              <th className="p-2 border text-center">Precio</th> 
              <th className="p-2 border text-center">Acciones</th>
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

                  <td className="p-2 text-center font-semibold">
                    <ActionMenu product_id={product.id}
                    onEdit={() => console.log(`Editing product ${product.id}`)}
                    onDelete={() => onRemoveProduct(product.id)} />
                  </td>

                </tr>
              ))
            ) : (
              <tr className="w-full">
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
