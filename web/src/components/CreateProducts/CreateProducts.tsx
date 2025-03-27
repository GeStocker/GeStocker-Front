"use client";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { ICategory, IProduct } from "@/types/interface";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Formik } from "formik";
import * as Yup from "yup";
import { getAllCategories } from "@/services/user/category";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "@/services/user/product";

const productSchema = Yup.object({
  name: Yup.string()
    .required("El campo no puede estar vacío")
    .min(5, "El nombre tener un minimo de 5 caracteres"),
  category: Yup.string()
    .required("El campo no puede estar vacío")
    .min(5, "La categoria debe tener un minimo de 5 caracteres"),
  description: Yup.string()
    .required("El campo no puede estar vacío")
    .min(5, "La descripcion debe tener un minimo de 5 caracteres"),
});
const productEditSchema = Yup.object({
  name: Yup.string()
    .required("El campo no puede estar vacío")
    .min(5, "El nombre tener un minimo de 5 caracteres"),
  description: Yup.string()
    .required("El campo no puede estar vacío")
    .min(5, "La descripcion debe tener un minimo de 5 caracteres"),
});

interface FormData {
  name: string;
  category: string;
  description: string;
  fileImage?: File;
}

const CreateProducts = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { businessId } = useBusiness();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    description: string;
    fileImage?: string;
  }>({ id: "", name: "", description: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);

  const fetchCategories = async () => {
    if (!token) return;
    try {
      if (!businessId) return;
      const categories = await getAllCategories(businessId, token);
      setCategories(categories);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer las categorias:", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer las categorias:", e);
        toast.error("Error al traer las categorias");
      }
    }
  };
  const fetchProducts = async () => {
    if (!token) return;
    try {
      if (!businessId) return;
      const categories = await getAllProducts(businessId, token);
      setProducts(categories);
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
    fetchCategories();
  }, [businessId]);

  const handleOnSubmit = async (values: FormData) => {
    if (!businessId || !token) return;
    try {
      await createProduct(values, businessId, token);
      toast.success("Producto creado con exito");
      fetchCategories();
      fetchProducts();
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al crear producto", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al crear producto", e);
        toast.error("Error al crear producto");
      }
    }
  };

  const handleOnSubmitEdit = async (values: Partial<FormData>) => {
    if (!token || selectedProduct.id === "" || !businessId) return;
    try {
      await updateProduct(values, selectedProduct.id, token);
      toast.success("Producto editado con exito");
      fetchProducts();
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al editar producto", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al editar producto", e);
        toast.error("Error al editar producto");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 items-center justify-center border shadow-lg w-[500] m-auto my-8 p-6 rounded-lg">
        <h1 className="text-left font-semibold text-2xl">Agregar productos</h1>
        <div className="border rounded-md text-center p-1 w-11/12">
          <h2 className="text-lg text-custom-textGris">
            Productos ya cargados
          </h2>
          <div className="border-t border-stone-300 my-1 " />
          <div className="flex flex-col h-fit max-h-56 overflow-y-auto">
            {products ? (
              products
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((product) => (
                  <span
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        fileImage: product.img,
                      });
                    }}
                    className="cursor-pointer hover:text-teal-800 text-lg"
                  >
                    {product.name}
                  </span>
                ))
            ) : (
              <span>No hay productos agregados</span>
            )}
          </div>
        </div>
        <Tabs defaultValue="añadir" className="min-w-11/12 my-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editar">Editar producto existente</TabsTrigger>
            <TabsTrigger value="añadir">Añadir nuevo producto</TabsTrigger>
          </TabsList>
          <TabsContent value="añadir">
            <Formik
              initialValues={{
                name: "",
                category: "",
                description: "",
              }}
              validationSchema={productSchema}
              onSubmit={handleOnSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h2 className="font-semibold text-2xl text-left">
                      Agregar nuevo producto
                    </h2>
                    <div className="flex flex-col gap-1 w-full mt-4">
                      <label htmlFor="name" className="font-semibold text-base">
                        Nombre:
                      </label>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className="w-full p-2 mb-2  border border-stone-400 bg-white rounded-lg"
                      />
                      {errors.name && touched.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 w-full relative">
                      <label
                        htmlFor="category"
                        className="font-semibold text-base"
                      >
                        Categoría:
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={selectedCategory}
                        readOnly
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        disabled={newCategoryOpen}
                        className="w-full p-2 border mb-4 border-stone-400 bg-white rounded-lg cursor-pointer disabled:bg-custom-GrisOscuro"
                      />
                      {isDropdownOpen && (
                        <div className="w-full absolute top-18 z-10 p-2 mb-4 border h-fit max-h-60 border-stone-400 bg-white rounded-lg cursor-pointer overflow-y-auto">
                          {categories
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((category) => (
                              <div
                                key={category.id}
                                onClick={() => {
                                  setSelectedCategory(category.name);
                                  setIsDropdownOpen(false);
                                  setFieldValue("category", category.name);
                                }}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                              >
                                {category.name}
                              </div>
                            ))}
                        </div>
                      )}
                      {newCategoryOpen ? (
                        <div className=" flex flex-col items-center justify-center">
                          <label
                            htmlFor="category"
                            className="font-semibold text-base"
                          >
                            Nombre nueva categoría:
                          </label>
                          <input
                            type="text"
                            name="category"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category}
                            className="w-full p-2 mb-4  border border-stone-400 bg-white rounded-lg"
                          />
                          <Button onClick={() => setNewCategoryOpen(false)}>
                            Cancelar
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => setNewCategoryOpen(true)}
                        >
                          Agregar otra categoria
                        </Button>
                      )}
                      {errors.category && touched.category && (
                        <p className="text-red-500 text-sm">
                          {errors.category}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 w-full mt-4">
                      <label
                        htmlFor="description"
                        className="font-semibold text-base"
                      >
                        Descripcion:
                      </label>
                      <input
                        type="text"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className="w-full p-2 mb-4  border border-stone-400 bg-white rounded-lg"
                      />
                      {errors.description && touched.description && (
                        <p className="text-red-500 text-sm">
                          {errors.description}
                        </p>
                      )}
                    </div>
                    <Button size="lg" type="submit">
                      Agregar nuevo producto
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </TabsContent>
          <TabsContent value="editar">
            <Formik
              initialValues={{
                name: "",
                description: "",
              }}
              validationSchema={productEditSchema}
              onSubmit={handleOnSubmitEdit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h2 className="font-semibold text-2xl text-left">
                      Editar producto
                    </h2>
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex flex-col gap-1 w-full mt-4">
                        <label
                          htmlFor="name"
                          className="font-semibold text-base"
                        >
                          Nombre actual:
                        </label>
                        <input
                          type="text"
                          value={selectedProduct.name}
                          disabled
                          className="w-full p-2  border border-stone-400 bg-white rounded-lg disabled:bg-custom-grisClarito"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label
                          htmlFor="name"
                          className="font-semibold text-base"
                        >
                          Nombre nuevo:
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          className="w-full p-2 mb-2  border border-stone-400 bg-white rounded-lg"
                        />
                        {errors.name && touched.name && (
                          <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex flex-col gap-1 w-full ">
                        <label
                          htmlFor="description"
                          className="font-semibold text-base"
                        >
                          Descripcion Actual:
                        </label>
                        <input
                          type="text"
                          value={selectedProduct.description}
                          disabled
                          className="w-full p-2 mb-4  border border-stone-400 bg-white rounded-lg disabled:bg-custom-grisClarito"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full ">
                        <label
                          htmlFor="description"
                          className="font-semibold text-base"
                        >
                          Descripcion nueva:
                        </label>
                        <input
                          type="text"
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          className="w-full p-2 mb-4  border border-stone-400 bg-white rounded-lg"
                        />
                        {errors.description && touched.description && (
                          <p className="text-red-500 text-sm">
                            {errors.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {selectedProduct.id === "" ? (
                                          <span>Debes seleccionar un producto</span>
                                        ) : (
                                          <Button variant="outline" size="lg" type="submit">
                                            Editar producto
                                          </Button>
                                        )}
                  </div>
                </form>
              )}
            </Formik>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateProducts;
