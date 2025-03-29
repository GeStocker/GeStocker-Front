"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import * as Yup from "yup";
import { getAllProducts } from "@/services/user/product";
import { IProduct } from "@/types/interface";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { addProduct } from "@/services/user/inventory_product";

const productSchema = Yup.object({
  newStock: Yup.number()
    .min(1, "Debe ser mayor o igual a 1")
    .required("Hay un campo vacío"),
  purchasePrice: Yup.number()
    .min(1, "Debe ser mayor o igual a 1")
    .required("Hay un campo vacío"),
  sellingPrice: Yup.number()
    .min(1, "Debe ser mayor o igual a 1")
    .required("Hay un campo vacío"),
});

interface ISelectProduct {
  id: string;
  name: string;
  stock: number;
  price: number;
  newStock?: number;
  purchasePrice?: number;
  sellingPrice?: number;
}

const AddSellProducts = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const { businessId } = useBusiness();
  const [selectedProducts, setSelectedProducts] = useState<ISelectProduct[]>(
    []
  );
  const [inventoryId, setInventoryId] = useState("");

  const [errors, setErrors] = useState<Record<number, Record<string, string>>>(
    []
  );

  const fetchProducts = async () => {
    if (!token) return;
    try {
      if (!businessId) return;
      const products = await getAllProducts(businessId, token);
      setProducts(products);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer los productos:", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer los productos:", e);
        toast.error("Error al traer los productos");
      }
    }
  };
  useEffect(() => {
    setInventoryId("2892edec-75d1-4c2b-b57f-5e4a5de0fbff"); //HARDCODEADO PARA TESTEAR
    fetchProducts();
  }, [businessId]);

  const onClickSelectProduct = (product: ISelectProduct) => () => {
    const alreadySelected = selectedProducts.some((p) => p.id === product.id);
    if (!alreadySelected) {
      setSelectedProducts((prev) => [
        ...prev,
        {
          id: product.id,
          stock: product.stock,
          name: product.name,
          price: product.price,
          newStock: 0,
          purchasePrice: 0,
          sellingPrice: Number(product.price),
        },
      ]);
      return;
    }
    setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleChange = async (index: number, field: string, value: string) => {
    setSelectedProducts((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, [field]: parseFloat(value) } : p
      )
    );

    try {
      // Validar el campo actual en tiempo real
      await productSchema.validateAt(field, { [field]: parseFloat(value) });
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (!newErrors[index]) newErrors[index] = {};
        newErrors[index][field] = ""; // Limpia el error para este campo
        return newErrors;
      });
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          if (!newErrors[index]) newErrors[index] = {};
          newErrors[index][field] = err.message; // Agrega el error para este campo
          return newErrors;
        });
      }
    }
  };

  const sendProducts = async (selectedProducts: ISelectProduct[]) => {
    if (!token || !businessId) return;
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
      setSelectedProducts([])
      toast.success("Se añadieron con exito");
      fetchProducts();
    } catch (error) {
      console.warn(error);
      toast.error("No se pudo añadir los productos");
    }
  };


  const handleSendProducts = async () => {
    let hasErrors = false; // Bandera para verificar si hay errores
  
    // Validamos todos los productos con Yup
    await Promise.all(
      selectedProducts.map(async (product, index) => {
        try {
          await productSchema.validate(product, { abortEarly: false });
          // Si pasa la validación, limpiamos los errores para este producto
          setErrors((prev) => {
            const newErrors = { ...prev };
            newErrors[index] = {}; // Limpia los errores para este índice
            return newErrors;
          });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            hasErrors = true; // Marcamos que hay errores
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
  
    // Si hay errores, mostramos un mensaje y detenemos el envío
    if (hasErrors) {
      toast.error("Revisa los errores antes de enviar");
      return;
    }
  
    // Si no hay errores, enviamos los productos
    try {
      await sendProducts(selectedProducts);
      toast.success("Productos enviados con éxito");
      setErrors([]); // Limpia los errores después de enviar
    } catch (error) {
      console.error("Error al enviar los productos:", error);
      toast.error("Hubo un problema al enviar los productos");
    }
  };

  return (
    <div className="flex flex-col gap-1 items-center">
      <h1 className="text-2xl font-semibold text-left">Añadir productos</h1>
      <Tabs defaultValue="seleccionar" className="w-4/5 p-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="seleccionar">Seleccionar productos</TabsTrigger>
          <TabsTrigger value="excel">Subir excel</TabsTrigger>
        </TabsList>
        <TabsContent value="seleccionar">
          <div className="flex w-full flex-row-reverse justify-center gap-x-8 my-2">
            <div className="border rounded-md text-center w-full h-fit p-1">
              <h2 className="text-lg text-custom-textGris">
                Seleccionar producto
              </h2>
              <div className="border-t border-stone-300 my-1 " />
              <div className="flex flex-col h-fit w-full max-h-96 overflow-y-auto">
                {products.length > 0 ? (
                  products
                    .sort((a, b) =>
                      a.product_name.localeCompare(b.product_name)
                    )
                    .map((product) => (
                      <div
                        key={product.product_id}
                        className="grid grid-cols-3 text-lg gap-1"
                      >
                        <label className="flex gap-1 cursor-pointer hover:text-teal-800">
                          <input
                            type="checkbox"
                            onClick={onClickSelectProduct({
                              id: product.product_id,
                              name: product.product_name,
                              stock: product.inventoryProduct_stock ?? 0,
                              price: product.inventoryProduct_price ?? 0,
                            })}
                          />
                          <span>{product.product_name}</span>
                        </label>
                        <span>{product.category_name}</span>
                        <span>{`${
                          product.inventoryProduct_stock ?? 0
                        } unidades en stock`}</span>
                      </div>
                    ))
                ) : (
                  <span>No hay productos agregados</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 justify-center">
            {selectedProducts ? (
              <div className="flex flex-col gap-4">
                {/* Encabezados */}
                <div className="grid grid-cols-5 bg-gray-100 p-2 rounded-md font-semibold text-center">
                  <span>Producto</span>
                  <span>Stock actual</span>
                  <span>Añadir stock</span>
                  <span>Precio de compra</span>
                  <span>Precio de venta</span>
                </div>

                {/* Filas de productos */}
                {selectedProducts.map((p, index) => (
                  <div
                    key={p.id}
                    className="grid grid-cols-5 text-center gap-2 items-center"
                  >
                    <span>{p.name}</span>
                    <span>{p.stock}</span>

                    <div>
                      <input
                        type="number"
                        value={p.newStock ?? 0}
                        onChange={(e) =>
                          handleChange(index, "newStock", e.target.value)
                        }
                        className="w-20 p-1 border border-gray-400 rounded text-center"
                      />
                      {errors[index]?.newStock && (
                        <p className="text-red-500 text-sm">
                          {errors[index].newStock}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="number"
                        value={p.purchasePrice ?? 0}
                        onChange={(e) =>
                          handleChange(index, "purchasePrice", e.target.value)
                        }
                        className="w-20 p-1 border border-gray-400 rounded text-center"
                      />
                      {errors[index]?.purchasePrice && (
                        <p className="text-red-500 text-sm">
                          {errors[index].purchasePrice}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="number"
                        value={p.sellingPrice ?? 0}
                        onChange={(e) =>
                          handleChange(index, "sellingPrice", e.target.value)
                        }
                        className="w-20 p-1 border border-gray-400 rounded text-center"
                      />
                      {errors[index]?.sellingPrice && (
                        <p className="text-red-500 text-sm">
                          {errors[index].sellingPrice}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Botón único para enviar todo */}
                <Button size="lg" onClick={handleSendProducts} className="mt-4 w-fit mx-auto">
                  Agregar productos
                </Button>
              </div>
            ) : (
              <span>No has agregado ningun producto</span>
            )}
          </div>
        </TabsContent>
        <TabsContent value="excel">
          <p>excel</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddSellProducts;
