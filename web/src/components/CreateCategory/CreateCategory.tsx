"use client";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import {
  createCategory,
  getAllCategories,
  updateCategory,
} from "@/services/user/category";
import { ICategory } from "@/types/interface";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Formik } from "formik";
import * as Yup from "yup";

const categorySchema = Yup.object({
  name: Yup.string()
    .required("El campo no puede estar vacío")
    .min(5, "El nombre debe tener un minimo de 5 caracteres"),
});

interface FormData {
  name: string;
}

const CreateCategory = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { businessId } = useBusiness();
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });

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

  useEffect(() => {
    fetchCategories();
  }, [businessId]);

  const handleOnSubmitCreate = async (values: FormData,  { resetForm }: { resetForm: () => void }) => {
    if (!businessId || !token) return;
    try {
      await createCategory(values, businessId, token);
      toast.success("Categoría creada con exito");
      fetchCategories();
      resetForm()
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al crear categoria", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al crear categoria", e);
        toast.error("Error al crear categoria");
      }
    }
  };
  const handleOnSubmitEdit = async (values: FormData,  { resetForm }: { resetForm: () => void }) => {
    if (!token || selectedCategory.id === "" || !businessId) return;
    try {
      await updateCategory(values, businessId, selectedCategory.id, token);
      toast.success("Categoría editada con exito");
      fetchCategories();
      resetForm()
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al editar categoria", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al editar categoria", e);
        toast.error("Error al editar categoria");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 items-center justify-center border shadow-lg w-[500] m-auto my-8 p-6 rounded-lg">
        <h1 className="text-left font-semibold text-2xl">Agregar categorías</h1>
        <div className="border rounded-md text-center p-1 w-11/12">
          <h2 className="text-lg text-custom-textSubtitle">
            Categorías existentes
          </h2>
          <div className="border-t border-custom-grisClarito my-1 " />
          <div className="flex flex-col h-fit max-h-56 overflow-y-auto">
            {categories.length > 0 ? (
              categories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <span
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory({
                        id: category.id,
                        name: category.name,
                      });
                    }}
                    className="cursor-pointer hover:text-teal-800 text-lg"
                  >
                    {category.name}
                  </span>
                ))
            ) : (
              <span>No hay categorias agregadas</span>
            )}
          </div>
        </div>

        <Tabs defaultValue="añadir" className="min-w-11/12 my-2">
          <TabsList className="grid w-full grid-cols-2 text-fo">
            <TabsTrigger value="editar">Editar categoría existente</TabsTrigger>
            <TabsTrigger value="añadir">Añadir nueva categoría</TabsTrigger>
          </TabsList>
          <TabsContent value="añadir">
            <Formik
              initialValues={{
                name: "",
              }}
              validationSchema={categorySchema}
              onSubmit={handleOnSubmitCreate}
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
                    <div className="flex flex-col gap-1 w-1/2 mt-4">
                      <label htmlFor="name" className="font-semibold text-base">
                        Nombre nueva categoría:
                      </label>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className="w-full p-2 mb-4  border border-custom-GrisOscuro bg-background rounded-lg"
                      />
                      {errors.name && touched.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>
                    <Button size="lg" type="submit">
                      Agregar nueva categoría
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
              }}
              validationSchema={categorySchema}
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
                    <div className="flex flex-row gap-3">
                      <div className="flex flex-col gap-1 w-1/2 mt-4">
                        <label
                          htmlFor="name"
                          className="font-semibold text-base"
                        >
                          Nombre actual:
                        </label>
                        <input
                          type="name"
                          name="name"
                          value={selectedCategory.name}
                          disabled
                          className="w-full p-2 mb-4  border border-custom-GrisOscuro bg-background rounded-lg disabled:bg-custom-grisClarito"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-1/2 mt-4">
                        <label
                          htmlFor="name"
                          className="font-semibold text-base"
                        >
                          Nuevo nombre:
                        </label>
                        <input
                          type="name"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          className="w-full p-2 mb-4  border border-custom-GrisOscuro bg-background rounded-lg"
                        />
                        {errors.name && touched.name && (
                          <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                      </div>
                    </div>
                    {selectedCategory.id === "" ? (
                      <span>Debes seleccionar una categoría</span>
                    ) : (
                      <Button variant="outline" size="lg" type="submit">
                        Editar categoría
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

export default CreateCategory;
