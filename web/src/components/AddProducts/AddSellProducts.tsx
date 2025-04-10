"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import * as Yup from "yup";
import { getAllProducts } from "@/services/user/product";
import { IProduct, IStockProduct } from "@/types/interface";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  addProduct,
  addProductExcelInventory,
  getProductsByInventory,
  saveSellOrder,
} from "@/services/user/inventory_product";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";
import ButtonBack from "../ui/ButtonBack";
import { useRouter } from "next/navigation";

const productSchema = Yup.object({
  newStock: Yup.number()
    .min(1, "Debe ser mayor o igual a 1")
    .required("Este campo es obligatorio"),
  purchasePrice: Yup.number()
    .min(1, "Debe ser mayor o igual a 1")
    .required("Este campo es obligatorio"),
  sellingPrice: Yup.number()
    .min(1, "Debe ser mayor o igual a 1")
    .required("Este campo es obligatorio"),
});

const sellSchema = Yup.object({
  sellQuantity: Yup.number()
    .min(1, "Debe ser mayor o igual a 1")
    .required("Este campo es obligatorio")
    .test({
      name: "quantity-le-stock",
      message: "La cantidad de venta no puede ser mayor al stock disponible",
      test: function (value) {
        const { stock } = this.parent;
        return value <= stock;
      },
    })
});

interface ISelectProduct {
  id: string;
  productInventoryId: string;
  name: string;
  stock: number;
  price: number;
  newStock?: number;
  purchasePrice?: number;
  sellingPrice?: number;
  sellQuantity?: number;
}

const AddSellProducts = ({ type }: { type: "add" | "sell" }) => {
  const { token } = useAuth();
  const [products, setProducts] = useState<IStockProduct[]>([]);
  const [productsBusiness, setProductsBusiness] = useState<IProduct[]>([]);
  const { businessId, inventoryId } = useBusiness();
  const [selectedProducts, setSelectedProducts] = useState<ISelectProduct[]>([]);
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending]=useState(false);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const router = useRouter();
  const [sellQuantity, setSellQuantity] = useState(0); // Estado para la cantidad de venta
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (!token) return;
    
    try {
      if (!inventoryId || !businessId) return;
      
      const [productsGeneral, productsInventory] = await Promise.all([
        getAllProducts(businessId, token, {}),
        getProductsByInventory(inventoryId, token, {})
      ]);
      
      setProductsBusiness(productsGeneral);
      setProducts(productsInventory);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer los productos:", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer los productos:", e);
        toast.error("Error al traer los productos");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [businessId, inventoryId]);

  const onClickSelectProduct = (product: ISelectProduct) => () => {
    if (isLoading) return;
    
    const alreadySelected = selectedProducts.some((p) => p.id === product.id);
    if (!alreadySelected) {
      const matchingProduct = products.find((p) => p.product.id === product.id);

      setSelectedProducts((prev) => [
        ...prev,
        {
          id: product.id,
          productInventoryId: product.productInventoryId,
          stock: matchingProduct ? matchingProduct.stock : 0,
          name: product.name,
          price: matchingProduct ? parseFloat(matchingProduct.price) : 0,
          newStock: 0,
          purchasePrice: 0,
          sellingPrice: matchingProduct ? parseFloat(matchingProduct.price) : 0,
        },
      ]);
      return;
    }
    setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleChange = async (index: number, field: string, value: string) => {
    if (isLoading) return;
    
    setSelectedProducts((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, [field]: parseFloat(value) } : p
      )
    );

    try {
      await productSchema.validateAt(field, { [field]: parseFloat(value) });
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (!newErrors[index]) newErrors[index] = {};
        newErrors[index][field] = "";
        return newErrors;
      });
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          if (!newErrors[index]) newErrors[index] = {};
          newErrors[index][field] = err.message;
          return newErrors;
        });
      }
    }
  };

  const handleChangeDiscount = (value: string) => {
    if (isLoading) return;
    setDiscount(parseFloat(value));
    setDiscountError(null);
  };

  const sendProducts = async (selectedProducts: ISelectProduct[]) => {
    if (!token || !businessId || !inventoryId) return;
    
    try {
      const productos = selectedProducts.map((p) => {
        const { id, purchasePrice, sellingPrice, newStock } = p;
        return {
          productId: id,
          sellingPrice: sellingPrice ?? 1,
          purchasePrice: purchasePrice ?? 1,
          quantity: newStock ?? 0,
        };
      });
      
      await addProduct(productos, inventoryId, businessId, token);
      setSelectedProducts([]);
      toast.success("Se añadieron con éxito");
      await fetchProducts();
    } catch (error) {
      console.warn(error);
      toast.error("No se pudo añadir los productos");
      throw error;
    }
  };

  const sendSellOrder = async (selectedProducts: ISelectProduct[]) => {
    if (!token || !inventoryId) return;
    
    try {
      const productos = selectedProducts.map((p) => {
        const { productInventoryId, sellQuantity } = p;
        return {
          inventoryProductId: productInventoryId,
          quantity: sellQuantity ?? 0,
        };
      });
      
      await saveSellOrder(
        { outgoingProducts: productos, discount },
        inventoryId,
        token
      );
      
      setSelectedProducts([]);
      setDiscount(0);
      toast.success("Se creó venta con éxito");
      await fetchProducts();
    } catch (error) {
      console.warn(error);
      toast.error("No se pudo crear la venta");
      throw error;
    }
  };

  const handleSendProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    let hasErrors = false;

    try {
      // Validar todos los productos
      await Promise.all(
        selectedProducts.map(async (product, index) => {
          try {
            if (type === "add") {
              await productSchema.validate(product, { abortEarly: false });
            } else {
              await sellSchema.validate(product, { abortEarly: false });
            }
            
            setErrors((prev) => {
              const newErrors = { ...prev };
              newErrors[index] = {};
              return newErrors;
            });
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              hasErrors = true;
              setErrors((prev) => {
                const newErrors = { ...prev };
                if (!newErrors[index]) newErrors[index] = {};
                err.inner.forEach((e) => {
                  if (e.path) {
                    newErrors[index][e.path] = e.message;
                  }
                });
                return newErrors;
              });
            }
          }
        })
      );

      if (hasErrors) {
        toast.warning("Revisa los errores antes de enviar");
        return;
      }

      if (type === "add") {
        await sendProducts(selectedProducts);
      } else {
        if (discount < 0) {
          setDiscountError("Debe ser mayor o igual a 0");
          return;
        }
        await sendSellOrder(selectedProducts);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitExcel = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSending(true);
      if (!excelFile || !token || !businessId || !inventoryId) return;
      try {
        const userId = getUserIdFromToken(token);
        console.log("userId", userId);
        if (!userId) return;
        const formData = new FormData();
        formData.append("file", excelFile);
        await addProductExcelInventory(excelFile, userId, businessId, inventoryId, token);
        toast.success("Productos añadidos con exito");
        fetchProducts()
        setTimeout(() => {
          router.push("/dashboard/inventory");
        }
        , 2000);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.warn("Error al añadir productos", e.message);
  
          toast.error(`Error: ${e.message}`);
        } else {
          console.warn("Error al añadir producto", e);
          toast.error("Error al editar producto");
        }
      }finally{
        setIsSending(false)
      }
    };

  return (
    <div className="flex flex-col gap-1 items-center relative">
      <div className="flex justify-end w-full mt-5">
        <ButtonBack/>
      </div>
      {type === "add" && <h1 className="text-2xl font-semibold text-left">Añadir productos</h1>}
      {type === "sell" && <h1 className="text-2xl font-semibold text-left">Añadir venta</h1>}
      
      <Tabs defaultValue="seleccionar" className="w-4/5 p-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="seleccionar">Seleccionar productos</TabsTrigger>
          {type === "add" && <TabsTrigger value="excel">Subir excel</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="seleccionar">
          <div className="flex w-full flex-row-reverse justify-center gap-x-8 my-2">
            <div className="border rounded-md text-center w-full h-fit p-1">
              <h2 className="text-lg text-custom-textSubtitle">
                Seleccionar producto
              </h2>
              <div className="border-t border-custom-grisClarito my-1" />
              <div className="flex flex-col h-fit w-full max-h-96 overflow-y-auto">
                {isLoading ? <span className="text-center">Cargando productos...</span> : type === "sell" ? (
                  products.length > 0 ? (
                    products
                      .sort((a, b) => a.product.name.localeCompare(b.product.name))
                      .map((product) => (
                        <div
                          key={product.product.id}
                          className="grid grid-cols-4 text-lg gap-1"
                        >
                          <label className="flex gap-1 cursor-pointer hover:text-teal-800">
                            <input
                              type="checkbox"
                              checked={
                                selectedProducts.some(
                                  (p) => product.product.id === p.id
                                ) || false
                              }
                              onClick={onClickSelectProduct({
                                id: product.product.id ?? "",
                                productInventoryId: product.id ?? "",
                                name: product.product.name,
                                stock: product.stock ?? 0,
                                price: parseFloat(product.price) ?? 0,
                              })}
                              onChange={() => {}}
                              disabled={isLoading}
                            />
                            <span>{product.product.name}</span>
                          </label>
                          <span>{product.product.category.name}</span>
                          <img 
                            src={product.product.img} 
                            alt={`foto ${product.product.name}`} 
                            className="w-6 h-6 m-auto"
                          />
                          <span>{`${product.stock ?? 0} unidades en stock`}</span>
                        </div>
                      ))
                  ) : (
                    <span>No hay productos agregados</span>
                  )
                ) : productsBusiness.length > 0 ? (
                  productsBusiness
                    .sort((a, b) => a.product_name.localeCompare(b.product_name))
                    .map((product) => (
                      <div
                        key={product.product_id}
                        className="grid grid-cols-4 text-lg gap-1 items-center"
                      >
                        <label className="flex gap-1 cursor-pointer hover:text-teal-800">
                          <input
                            type="checkbox"
                            checked={
                              selectedProducts.some(
                                (p) => product.product_id === p.id
                              ) || false
                            }
                            onClick={onClickSelectProduct({
                              id: product.product_id ?? "",
                              productInventoryId: "",
                              name: product.product_name,
                              stock: product.inventoryProduct_stock ?? 0,
                              price: product.inventoryProduct_price ?? 0,
                            })}
                            onChange={() => {}}
                            disabled={isLoading}
                          />
                          <span>{product.product_name}</span>
                        </label>
                        <span>{product.category_name}</span>
                        <img 
                          src={product.product_img} 
                          alt={`foto ${product.product_name}`} 
                          className="w-6 h-6 m-auto"
                        />
                        <span className="text-base">{product.product_description}</span>
                      </div>
                    ))
                ) : (
                  <span>No hay productos agregados</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1 justify-center">
            {selectedProducts.length > 0 ? (
              <div className="flex flex-col gap-4">
                {/* Encabezados */}
                <div className="grid grid-cols-5 bg-custom-grisClarito p-2 rounded-md font-semibold text-center">
                  <span>Producto</span>
                  <span>Stock actual</span>
                  {type === "add" && <span>Añadir stock</span>}
                  {type === "add" && <span>Precio de compra</span>}
                  <span>Precio de venta</span>  
                  {type === "sell" && <span>Cantidad de venta</span>}
                </div>

                {/* Filas de productos */}
                {selectedProducts.map((p, index) => (
                  <div
                    key={p.id}
                    className="grid grid-cols-5 text-center gap-2 items-center"
                  >
                    <span>{p.name}</span>
                    <span>{p.stock}</span>

                    {type === "add" && (
                      <div>
                        <input
                          type="number"
                          value={p.newStock ?? 0}
                          onChange={(e) =>
                            handleChange(index, "newStock", e.target.value ?? "0")
                          }
                          className="w-20 p-1 border border-custom-GrisOscuro rounded text-center"
                          disabled={isLoading}
                          min="0"
                        />
                        {errors[index]?.newStock && (
                          <p className="text-red-500 text-sm">
                            {errors[index].newStock}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {type === "add" && (
                      <div>
                        <input
                          type="number"
                          value={p.purchasePrice ?? 0}
                          onChange={(e) =>
                            handleChange(index, "purchasePrice", e.target.value ?? "0")
                          }
                          className="w-20 p-1 border border-custom-GrisOscuro rounded text-center"
                          disabled={isLoading}
                          min="0"
                        />
                        {errors[index]?.purchasePrice && (
                          <p className="text-red-500 text-sm">
                            {errors[index].purchasePrice}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {type === "add" && (
                      <div>
                        <input
                          type="number"
                          value={p.sellingPrice ?? 0}
                          onChange={(e) =>
                            handleChange(index, "sellingPrice", e.target.value ?? "0")
                          }
                          className="w-20 p-1 border border-custom-GrisOscuro rounded text-center"
                          disabled={isLoading}
                          min="0"
                        />
                        {errors[index]?.sellingPrice && (
                          <p className="text-red-500 text-sm">
                            {errors[index].sellingPrice}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {type === "sell" && <span>{`$${p.sellingPrice}`}</span>}
                    
                    {type === "sell" && (
                      <div>
                        <input
                          type="number"
                          value={sellQuantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (value <= p.stock) {
                              setSellQuantity(value);
                              setError("");
                            } else {
                              setError("La cantidad de venta no puede ser mayor al stock disponible");
                            }
                          }}
                          className="w-20 p-1 border border-custom-GrisOscuro rounded text-center"
                          disabled={isLoading}
                          min="1"
                          max={p.stock}
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                      </div>
                    )}
                  </div>
                ))}
                
                {type === "sell" && (
                  <div className="mt-4 mx-auto">
                    <label className="flex gap-4 items-center text-xl">
                      Descuento general:
                      <input
                        type="number"
                        value={discount ?? 0}
                        onChange={(e) => handleChangeDiscount(e.target.value ?? "0")}
                        className="w-20 p-1 border border-custom-GrisOscuro rounded text-center"
                        disabled={isLoading}
                        min="0"
                      />
                      %
                    </label>
                    {discountError && (
                      <p className="text-red-500 text-sm">{discountError}</p>
                    )}
                  </div>
                )}
                
                <Button
                  size="lg"
                  onClick={handleSendProducts}
                  className="mt-4 w-fit mx-auto disabled:bg-custom-grisOscuro"
                  disabled={selectedProducts.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span>{type === "add" ? "Agregando..." : "Agregando..."}</span>
                    </div>
                  ) : (
                    type === "add" ? "Agregar productos" : "Agregar venta"
                  )}
                </Button>
              </div>
            ) : (
              <span className="flex items-center justify-center">No has seleccionado ningún producto</span>
            )}
          </div>
        </TabsContent>
        
        {type === "add" && (
          <TabsContent value="excel">
            <div className="p-4 border rounded-lg shadow-md w-96 m-auto text-center mt-4">
              <h2 className="text-lg font-semibold mb-2">
                Subir Archivo Excel
              </h2>
              <form
                onSubmit={(e) => {
                  onSubmitExcel(e);
                }}
                className="flex flex-col gap-3"
              >
                <label>
                  Recuerda el archivo debe tener las columnas en ingles
                  <span className="text-orange-500 font-medium"> `Name`</span>
                  ,
                  <span className="text-orange-500 font-medium">
                    {" "}
                    `Description`
                  </span>{" "}
                  ,
                  <span className="text-orange-500 font-medium">
                    {" "}
                    `Category`
                  </span>
                  ,
                  <span className="text-orange-500 font-medium">
                    {" "}
                    `Stock`
                  </span>
                  ,
                  <span className="text-orange-500 font-medium">
                    {" "}
                    `Price`
                  </span>
                  y
                  <span className="text-orange-500 font-medium">
                    {" "}
                    `Purchase Price`
                  </span>
                </label>
                <label
                  htmlFor="excel"
                  className="border p-2 rounded cursor-pointer text-custom-textSubtitle text-sm"
                >
                  {excelFile
                    ? `📄 ${excelFile.name}`
                    : "📂 Seleccionar Archivo"}
                </label>

                <input
                  id="excel"
                  name="excel"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <Button type="submit" disabled={!excelFile}>
                  {isSending ? "Enviando..." : "Enviar archivo"}
                </Button>
              </form>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AddSellProducts;