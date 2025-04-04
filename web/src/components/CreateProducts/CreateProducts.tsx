"use client";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { ICategory, IProduct } from "@/types/interface";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { getAllCategories } from "@/services/user/category";
import {
  createProduct,
  createProductExcel,
  getAllProducts,
  updateProduct,
} from "@/services/user/product";
import { Camera, Info } from "lucide-react";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";

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
    product_id: string;
    product_name: string;
    product_description: string;
    product_category: string;
    product_fileImage?: string;
  }>({
    product_id: "",
    product_name: "",
    product_description: "",
    product_category: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("/sadImage.png");
  const [previewEditImage, setPreviewEditImage] = useState<string | null>(null);
  const [isAdding, setIsAdding]=useState(false);
  const [isSending, setIsSending]=useState(false);
  const [isEdit, setIsEdit]=useState(false);
  // Obtener el negocio guardado
  const [businessIdBusiness, setBusinessIdBusiness] = useState<string | null>(
    null
  );
  const [excelFile, setExcelFile] = useState<File | null>(null);


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
    if (businessIdBusiness) setBusinessIdBusiness(businessIdBusiness);
    fetchProducts();
    fetchCategories();
  }, [businessId]);

  const handleOnSubmit = async (
    values: FormData,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsAdding(true);
    if (!businessId || !token) return;
    try {
      console.log("este es el id del negocio", businessId)
      await createProduct(values, businessId, token);
      toast.success("Producto creado con exito");
      fetchCategories();
      fetchProducts();
      resetForm();
      setPreviewImage("/sadImage.png");
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al crear producto", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al crear producto", e);
        toast.error("Error al crear producto");
      }
    }finally{
      setIsAdding(false);
    }
  };

  const handleOnSubmitEdit = async (
    values: FormData,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsEdit(true);
    if (!token || selectedProduct.product_id === "" || !businessId) return;
    try {
      await updateProduct(values, selectedProduct.product_id, token);
      toast.success("Producto editado con exito");
      fetchProducts();
      resetForm();
      setPreviewEditImage(null);
      setSelectedProduct({
        product_id: "",
        product_name: "",
        product_description: "",
        product_category: "",
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al editar producto", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al editar producto", e);
        toast.error("Error al editar producto");
      }
    } finally {
      setIsEdit(false);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<FormData>["setFieldValue"],
    edit?: boolean
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFieldValue("fileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (edit) {
          setPreviewEditImage(reader.result as string);
        } else {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const initialValuesEdit = {
    name: selectedProduct?.product_name || "",
    description: selectedProduct?.product_description || "",
    category: selectedProduct?.product_category || "",
  };

  const onSubmitExcel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    if (!excelFile || !token || !businessId) return;
    try {
      const userId = getUserIdFromToken(token);
      if (!userId) return;
      const formData = new FormData();
      formData.append("file", excelFile);
      await createProductExcel(excelFile, userId, businessId, token);
      toast.success("Productos añadidos con exito");
      fetchProducts()
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
    <div>
      <div className="flex flex-row-reverse justify-center gap-x-8 my-8">
        <div className="border rounded-md text-center w-fit h-fit p-1">
          <h2 className="text-lg text-custom-textSubtitle">
            Lista de productos
          </h2>
          <div className="border-t border-custom-grisClarito my-1 " />
          <div className="flex flex-col h-fit w-[300] max-h-96 overflow-y-auto">
            {products.length > 0 ? (
              products
                .sort((a, b) => a.product_name.localeCompare(b.product_name))
                .map((product) => (
                  <span
                    key={product.product_id}
                    onClick={() => {
                      setSelectedProduct({
                        product_id: product.product_id,
                        product_name: product.product_name,
                        product_description: product.product_description,
                        product_fileImage: product.product_img,
                        product_category: product.category_name,
                      });
                    }}
                    className="cursor-pointer hover:text-teal-800 text-lg"
                  >
                    {product.product_name}
                  </span>
                ))
            ) : (
              <span>No hay productos agregados</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center border shadow-lg w-1/2 p-6 rounded-lg">
          <h1 className="text-left font-semibold text-2xl">
            Productos
          </h1>

          <Tabs defaultValue="añadir" className="min-w-11/12 my-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="excel">Añadir mediante Excel</TabsTrigger>
              <TabsTrigger value="editar">
                Editar producto
              </TabsTrigger>
              <TabsTrigger value="añadir">Añadir producto</TabsTrigger>
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
                        Agregar producto
                      </h2>
                      <div className="flex flex-col gap-1 w-full mt-4">
                        <label
                          htmlFor="name"
                          className="font-semibold text-base"
                        >
                          Nombre:
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          className="w-full p-2 mb-2  border border-custom-GrisOscuro bg-background rounded-lg"
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
                          className="w-full p-2 border mb-4 border-custom-GrisOscuro bg-background rounded-lg cursor-pointer disabled:bg-custom-grisClarito"
                        />
                        {isDropdownOpen && (
                          <div className="w-full absolute top-18 z-10 p-2 mb-4 border h-fit max-h-60 border-custom-GrisOscuro bg-background rounded-lg cursor-pointer overflow-y-auto">
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
                              className="w-full p-2 mb-4  border border-custom-GrisOscuro bg-background rounded-lg"
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
                          className="w-full p-2 mb-4  border border-custom-GrisOscuro bg-background rounded-lg"
                        />
                        {errors.description && touched.description && (
                          <p className="text-red-500 text-sm">
                            {errors.description}
                          </p>
                        )}
                      </div>
                      <h2 className="font-semibold text-base mt-4">
                        Elegir foto
                      </h2>
                      <div className=" relative">
                        <img
                          src={previewImage}
                          alt="User Profile"
                          className="w-40 h-40 rounded-full border"
                        />
                        <div className="absolute -right-2 -bottom-2">
                          <label htmlFor="fileImage" className="cursor-pointer">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                              <Camera className="h-4 w-4" />
                            </div>
                          </label>
                          <input
                            id="fileImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, setFieldValue)
                            }
                          />
                        </div>
                      </div>
                      <Button size="lg" type="submit">
                      {isAdding ? "Agregando..." : "Agregar producto"}
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </TabsContent>
            <TabsContent value="editar">
              <Formik
                initialValues={initialValuesEdit}
                validationSchema={productEditSchema}
                onSubmit={handleOnSubmitEdit}
                enableReinitialize
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
                        Editar producto
                      </h2>
                      <span className="flex text-sm text-red-600 mt-1">
                        <Info className="w-5 h-5 mr-2" />
                      Selecciona el producto a editar de la lista de Productos
                      </span>
                      <div className="flex gap-3 w-full">
                        <div className="flex flex-col gap-1 w-full mt-4">
                          <label
                            htmlFor="name"
                            className="font-semibold text-base"
                          >
                            Nombre actual:
                          </label>
                          <input
                            type="text"
                            value={selectedProduct.product_name}
                            disabled
                            className="w-full p-2 border border-custom-GrisOscuro bg-background rounded-lg disabled:bg-custom-grisClarito"
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-full mt-4">
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
                            className="w-full p-2 mb-2 border border-custom-GrisOscuro bg-background rounded-lg"
                          />
                          {errors.name && touched.name && (
                            <p className="text-red-500 text-sm">
                              {errors.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3 w-full">
                        <div className="flex flex-col gap-1 w-full ">
                          <label
                            htmlFor="description"
                            className="font-semibold text-base"
                          >
                            Descripcion Actual:
                          </label>
                          <input
                            type="text"
                            value={selectedProduct.product_description}
                            disabled
                            className="w-full p-2 mb-4 border border-custom-GrisOscuro bg-background rounded-lg disabled:bg-custom-grisClarito"
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
                            className="w-full p-2 mb-4 border border-custom-GrisOscuro bg-background rounded-lg"
                          />
                          {errors.description && touched.description && (
                            <p className="text-red-500 text-sm">
                              {errors.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3 w-full">
                        <div className="flex flex-col gap-1 w-full ">
                          <label
                            htmlFor="category"
                            className="font-semibold text-base"
                          >
                            Categoria Actual:
                          </label>
                          <input
                            type="text"
                            value={selectedProduct.product_category}
                            disabled
                            className="w-full p-2 mb-4 border border-custom-GrisOscuro bg-background rounded-lg disabled:bg-custom-grisClarito"
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-full relative">
                          <label
                            htmlFor="category"
                            className="font-semibold text-base"
                          >
                            Categoría nueva:
                          </label>
                          <input
                            type="text"
                            name="category"
                            value={selectedCategory}
                            readOnly
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            disabled={newCategoryOpen}
                            className="w-full p-2 border mb-4 border-custom-GrisOscuro bg-background rounded-lg cursor-pointer disabled:bg-custom-grisClarito"
                          />
                          {isDropdownOpen && (
                            <div className="w-full absolute top-18 z-10 p-2 mb-4 border h-fit max-h-60 border-custom-GrisOscuro bg-background rounded-lg cursor-pointer overflow-y-auto">
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
                                className="w-full p-2 mb-4  border border-custom-GrisOscuro bg-background rounded-lg"
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
                      </div>
                      <h2 className="font-semibold text-base mt-4">
                        Elegir foto
                      </h2>
                      <div className="relative">
                        <img
                          src={
                            previewEditImage ??
                            selectedProduct.product_fileImage
                          }
                          alt="File Profile"
                          className="w-40 h-40 rounded-full border"
                        />
                        <div className="absolute -right-2 -bottom-2 mb-7">
                          <label htmlFor="fileImage" className="cursor-pointer">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                              <Camera className="h-4 w-4" />
                            </div>
                          </label>
                          <input
                            id="fileImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, setFieldValue, true)
                            }
                          />
                        </div>
                      </div>
                        <Button size="lg" type="submit" disabled={!selectedProduct.product_id}>
                          {isEdit  ? "Editando..." : "Editar producto"}
                        </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </TabsContent>
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
                    y
                    <span className="text-orange-500 font-medium">
                      {" "}
                      `Category`
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;
