import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IProduct } from "@/types/interface";
import ScrollToTopButton from "../ScrollTop/ScrollToTopButton";
import ActionMenu from "../ActionMenu/ActionMenu";

interface ProductTableBusinessProps {
  products: IProduct[];
  onSearchChange: (value: string) => void; 
  searchValue: string;
}

const ProductTableBusiness: React.FC<ProductTableBusinessProps> = ({ 
  products, 
  onSearchChange, 
  searchValue 
}) => {

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

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border text-left">Imagen</th>
              <th className="p-2 border text-left">Producto</th>
              <th className="p-2 border text-left">Descripción</th>
              <th className="p-2 border text-left">Categoría</th>
              <th className="p-2 border text-left">Stock</th>
              <th className="p-2 border text-center">Estado Stock</th>
              <th className="p-2 border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.product_id} className="border">
                  <td className="p-2">
                    <img
                      src={product.product_img || "default-image-url.png"}
                      alt={product.product_name}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="p-2">{product.product_name}</td>
                  <td className="p-2">{product.product_description}</td>
                  <td className="p-2">{product.category_name || "Sin categoría"}</td>
                  <td className="p-2">{product.totalStock ?? "No disponible"}</td>
                  <td className={`p-2 text-center font-semibold ${
                      product.totalStock == null 
                      ? "text-gray-800" 
                      : product.totalStock === 0
                        ? "text-red-600" 
                        : (product.totalStock ?? 0) < 15
                        ? "text-yellow-600" 
                        : "text-green-600" 
                    }`}
                  >
                    {
                    product.totalStock == null 
                    ? "No disponible" 
                    :product.totalStock === 0
                      ? "Sin stock"
                      : (product.totalStock ?? 0) < 10
                      ? "Stock bajo"
                      : "Stock alto"}
                  </td>

                  <td className="p-2 text-center font-semibold">
                    <ActionMenu onEdit={() => console.log(`Editing product ${product.product_id}`)} />
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
      <div className="mt-4">
        <div className="flex justify-between mt-4">
          <ScrollToTopButton/>
        </div>
      </div>
    </div>
  );
};

export default ProductTableBusiness;
