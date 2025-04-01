"use client";
import React  from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createInventory } from "@/services/user/inventory";
import { useBusiness } from "@/context/BusinessContext";

const registerSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio"),
  address: Yup.string()
    .required("La direccion es obligatoria"),
  description: Yup.string()
    .required("La descripcion es obligatoria"),
});

interface InventoryFormValues {
  name: string;
  address: string;
  description: string;
}

interface InventoryFormProps {
  onSuccess?: () => void;
}

const FormInventory: React.FC<InventoryFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const { token } = useAuth();
  const { businessId, inventories, setInventories } = useBusiness();

  const handleOnSubmit = async (values: InventoryFormValues) => {
    try {
      if (!businessId) {
        toast.error("No hay ningún negocio seleccionado");
        return;
      }

      const newInventory = await createInventory({ 
        token: token ?? "", 
        inventoryData: {
          ...values,
        },
        businessId
      });

      setInventories([...inventories, {
        id: newInventory.id,
        name: newInventory.name
      }]);

      toast.success(`Inventario "${newInventory.name}" creado con éxito`, {
        action: {
          label: "Ver",
          onClick: () => router.push(`/dashboard/inventory/${newInventory.id}`)
        },
      });

      setTimeout(() => {
        router.push(`/dashboard/inventory/${newInventory.id}`);
      }, 1500);

      onSuccess?.();

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      toast.error(`Error al crear inventario: ${errorMessage}`);
    }
  };
      
  
    return (
      <div className="flex flex-col gap-2 items-center justify-center border shadow-lg w-fit m-auto my-8 p-6 rounded-lg">
        <div className="text-center mb-4">
          <h1 className="text-4xl text-gray-950 font-bold">Agrega un inventario</h1>
          <h2 className="text-xl text-custom-textSubtitle">
            Por favor agrega un inventario a GeStocker
          </h2>
        </div>
        <Formik
          initialValues={{
            name: "",
            address: "",
            description: "",
          }}
          validationSchema={registerSchema}
          onSubmit={handleOnSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col w-[350px]">
                  <label htmlFor="name" className="font-semibold text-xl self-start">
                    Nombre del Inventario
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="w-full p-3 mb-4 border border-black bg-gray-100 rounded-md"
                  />
                  {errors.name && touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
  
                <div className="flex flex-col w-[350px]">
                  <label htmlFor="address" className="font-semibold text-xl self-start">
                    Dirección del Inventario
                  </label>
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    className="w-full p-3 mb-4 border border-black bg-gray-100 rounded-md"
                  />
                  {errors.address && touched.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>
  
                <div className="flex flex-col w-[350px]">
                  <label htmlFor="description" className="font-semibold text-xl self-start">
                    Descripción del Inventario
                  </label>
                  <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="w-full p-3 mb-4 border border-black bg-gray-100 rounded-md"
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center items-center mt-4">
                <button
                  type="submit"
                  className="w-fit bg-black text-center text-white font-normal py-2 px-3 rounded-md transition duration-300"
                >
                  Agregar Inventario
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  };
  
  export default FormInventory;
  
