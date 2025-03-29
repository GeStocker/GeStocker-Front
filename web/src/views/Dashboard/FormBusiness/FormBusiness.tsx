"use client";
import React  from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createBusiness } from "@/services/user/business";

const registerSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio"),
  address: Yup.string()
    .required("La direccion es obligatoria"),
  description: Yup.string()
    .required("La descripcion es obligatoria"),
});

interface FormData {
  name: string;
  address: string;
  description: string,
}

const FormBusiness: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();

  const handleOnSubmit = async (values: FormData) => {
    try {
      await createBusiness(token  ?? "", values);
      toast.success("Negocio agregado con exito");
      setTimeout(() => {
        router.push("/dashboard/business/[id]");
      }, 2000);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al agregar negocio:", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al agregar negocio:", e);
        toast.error("Error al agregar negocio");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center border shadow-lg w-fit m-auto my-8 p-6 rounded-lg">
        <div className="text-center mb-4">
            <h1 className="text-4xl text-gray-950 font-bold">No has agregado ningún negocio</h1>
            <h2 className="text-xl text-custom-textSubtitle">Por favor agrega uno para iniciar tu camino en GeStocker</h2>
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
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col w-[350px]">
                <label
                  htmlFor="name"
                  className="font-semibold text-xl self-start"
                  >
                  Nombre del negocio
                </label>
                <input
                  type="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="w-full p-3 mb-4 border border-black bg-gray-100 rounded-md"
                  />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col w-[350px]">
                <label
                  htmlFor="address"
                  className="font-semibold text-xl self-start"
                >
                  Direccion del negocio
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    className="w-full p-3 mb-4 border border-black bg-gray-100 rounded-md"
                    />
                </div>
                {errors.address && touched.address && (
                    <p className=" text-red-500  text-sm">{errors.address}</p>
                )}
              </div>
              <div className="flex flex-col w-[350px]">
                <label
                  htmlFor="description"
                  className="font-semibold text-xl self-start"
                  >
                  Descripcion del negocio
                </label>
                <input
                  type="description"
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
                Agregar Negocio
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormBusiness;
