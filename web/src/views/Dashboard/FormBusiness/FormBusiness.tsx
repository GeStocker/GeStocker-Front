"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { createBusiness } from "@/services/user/business";

const registerSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  address: Yup.string()
    .required("La dirección es obligatoria")
    .min(5, "La dirección debe tener al menos 5 caracteres"),
  description: Yup.string()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
});

interface FormData {
  name: string;
  address: string;
  description: string;
}

const FormBusiness: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();
  const { setBusinessList, saveBusinessId } = useBusiness();
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleOnSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await createBusiness(token ?? "", values);
      


      setBusinessList(prev => [...prev, {
        id: response.id,
        name: response.name,
        address: response.address,
        description: response.description,
        createdAt: response.createdAt,
        isActive: response.isActive,
        inventories: []
      }]);
      
      saveBusinessId(response.id);
      localStorage.setItem("selectedBusinessId", response.id);
      
      toast.success(`Negocio "${response.name}" creado con éxito`, {
        action: {
          label: "Ir al negocio",
          onClick: () => router.push(`/dashboard/business/${response.id}`)
        },
      });
      
      setTimeout(() => {
        router.push(`/dashboard/business/${response.id}`);
      }, 1500);
      
    } catch (error: unknown) {
      console.warn("Error al crear negocio:", error);
      
      let errorMessage = "Error al crear negocio";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      toast.error(errorMessage);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center border shadow-lg w-fit m-auto my-8 p-6 rounded-lg">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold">Agregar un negocio</h1>
        <h2 className="text-xl text-custom-textSubtitle">Por favor agrega un negocio en GeStocker</h2>
      </div>
      
      <Formik
        initialValues={{
          name: "",
          address: "",
          description: ""
        }}
        validationSchema={registerSchema}
        onSubmit={handleOnSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          dirty
        }) => (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col w-[350px] mb-4">
                <label htmlFor="name" className="font-semibold text-xl self-start">
                  Nombre del negocio
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={`w-full p-3 border ${errors.name && touched.name ? 'border-red-500' : 'border-foreground'} bg-custom-grisClarito rounded-md`}
                  disabled={isSubmitting}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col w-[350px] mb-4">
                <label htmlFor="address" className="font-semibold text-xl self-start">
                  Dirección del negocio
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className={`w-full p-3 border ${errors.address && touched.address ? 'border-red-500' : 'border-foreground'} bg-custom-grisClarito rounded-md`}
                  disabled={isSubmitting}
                />
                {errors.address && touched.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="flex flex-col w-[350px] mb-6">
                <label htmlFor="description" className="font-semibold text-xl self-start">
                  Descripción del negocio
                </label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  rows={3}
                  className={`w-full p-3 border ${errors.description && touched.description ? 'border-red-500' : 'border-foreground'} bg-custom-grisClarito rounded-md`}
                  disabled={isSubmitting}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className={`w-fit bg-foreground text-center text-background font-normal py-2 px-6 rounded-md transition duration-300 ${
                  (isSubmitting || !isValid || !dirty) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-custom-casiNegro'
                }`}
              >
                {isSubmitting ? "Creando..." : "Agregar Negocio"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormBusiness;