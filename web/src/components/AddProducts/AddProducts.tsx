"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { getAllProducts } from "@/services/user/product";
import { IProduct } from "@/types/interface";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { addProduct } from "@/services/user/inventory_product";

const productSchema = Yup.object({
  stock: Yup.number()
    .required("El campo no puede estar vacío")
    .min(1, "Debe haber al menos 1 producto en stock"),
  price: Yup.number()
    .required("El campo no puede estar vacío")
    .min(1, "El precio debe ser mayor a cero"),
});

interface FormData {
  id: string;
  stock: number;
  price: number;
}

interface ISelectProduct {
  id: string;
  name: string;
  stock: number;
  price: number;
  newStock?: number;
  newPrice?: number;
}

const AddProducts = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const { businessId } = useBusiness();
  const [selectedProducts, setSelectedProducts] = useState<ISelectProduct[]>(
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
        },
      ]);
      return;
    }
    setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleOnSubmit = async (
    values: FormData
    // { resetForm }: { resetForm: () => void }
  ) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === values.id
          ? { ...p, newStock: values.stock, newPrice: values.price }
          : p
      )
    );
    console.log(selectedProducts);
  };

  const handleSendProducts = async () => {
    if (!token || !businessId) return;
    try {
      const productos = selectedProducts.map((p) => {
        const { id, newPrice, newStock} = p
        return { productId: id, sellingPrice: newPrice ?? 1, purchasePrice: newPrice ?? 1, quantity: newStock ?? 0 };
      });
      await addProduct(
        productos,
        "ae2f9f59-e37c-4359-90b8-3bb3a6886c4e",
        businessId,
        token
      );
      toast.success("Se añadieron con exito");
    } catch (error) {
      console.log(error);
      toast.error("Problemones");
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
                {products ? (
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
              <div className="flex flex-col gap-1">
                <div className="grid grid-cols-4 text-center">
                  <span>Producto</span>
                  <span>Stock actual</span>
                  {/* <span>Stock final</span> */}
                  {/* <div className="flex justify-between"> */}
                  <span>Añadir stock</span>
                  <span>Precio</span>
                  {/* </div> */}
                </div>
                {selectedProducts.map((p) => {
                  return (
                    <div key={p.id}>
                      <Formik
                        className="grid grid-cols-4 text-center"
                        initialValues={{
                          id: p.id,
                          stock: 0,
                          price: p.price,
                        }}
                        validationSchema={productSchema}
                        onSubmit={handleOnSubmit}
                        enableReinitialize
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                        }) => (
                          <form
                            onSubmit={handleSubmit}
                            className="flex gap-2 justify-between"
                          >
                            <span>{p.name}</span>
                            <span>{p.stock}</span>
                            <input
                              type="number"
                              name="stock"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.stock}
                              className="w-fit p-2 mb-2 border border-stone-400 bg-white rounded-lg"
                            />
                            {errors.stock && touched.stock && (
                              <p className="text-red-500 text-sm">
                                {errors.stock}
                              </p>
                            )}
                            <input
                              type="number"
                              name="price"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.price}
                              className="w-fit p-2 mb-2 border border-stone-400 bg-white rounded-lg"
                            />
                            {errors.price && touched.price && (
                              <p className="text-red-500 text-sm">
                                {errors.price}
                              </p>
                            )}
                            <Button size="lg" type="submit">
                              Añadir a inventario
                            </Button>
                          </form>
                        )}
                      </Formik>
                      <Button size="lg" onClick={handleSendProducts}>
                        Enviar data
                      </Button>
                    </div>
                  );
                })}
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

export default AddProducts;
