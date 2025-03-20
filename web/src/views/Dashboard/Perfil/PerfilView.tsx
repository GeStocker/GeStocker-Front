"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";
import { getUserById } from "@/services/user/user";

import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

interface FormData {
  name: string;
  email: string;
  city: string;
  address: string;
  phone: string;
}

const registerSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
      "El correo debe contener '@' y terminar en '.com'"
    )
    .required("El correo es obligatorio"),
  city: Yup.string().required("La ciudad es obligatoria"),
  address: Yup.string().required("La dirección es obligatoria"),
  phone: Yup.string()
    .matches(/^\d+$/, "Debe ser un número válido")
    .min(10, "Debe tener al menos 10 dígitos")
    .required("El teléfono es obligatorio"),
});

const PerfilView = () => {
  const {token} = useAuth()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    city: "",
    address: "",
    phone: "",
  });

  const fetchUserData = async () => {
    try {
      const userId = getUserIdFromToken(token ?? "") ?? "";
      const { name , email, city, address, phone } = (await getUserById(userId, token ?? ""));
      setUserData({
        name: name ?? "",
        email: email ?? "",
        city: city ?? "",
        address: address ?? "",
        phone: phone ?? ""
      });
    } catch (error) {
      console.warn("Error al obtener los datos del usuario", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [token]);

  const handleOnSubmit = async (values: FormData) => {
    try {
      toast.info("Se enviaron los datos, los revisara un supervisor");
      console.log(values);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al enviar los nuevos datos:", e.message);

        toast.error(`❌ Error: ${e.message}`);
      } else {
        console.warn("Error al enviar los nuevos datos:", e);
        toast.error("❌ Error al registrar el usuario");
      }
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-4xl text-gray-950 font-bold">Mi perfil</h1>
      <h2 className="text-xl text-custom-textGris">
        Administra tu información personal y preferencias
      </h2>
      <Tabs defaultValue="Informacion personal" className="w-full p-8">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="Informacion personal">
            Informacion personal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Informacion personal">
          <section className="w-full p-4 border rounded-md">
            <h2 className="text-xl text-gray-950 font-bold">
              Datos personales
            </h2>
            <h3 className="text-base text-custom-textGris">
              Actualiza tus informacion personal
            </h3>
            <div>
              <Formik
                initialValues={userData}
                enableReinitialize
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
                    <div className="flex gap-2 w-full">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="name"
                          className="font-semibold text-base"
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          className=" w-full p-2 mb-4 border border-stone-400 bg-white rounded-lg"
                        />
                        {errors.name && touched.name && (
                          <p className=" text-red-500  text-sm">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="email"
                          className="font-semibold text-base"
                        >
                          Correo
                        </label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          className=" w-full p-2 mb-1 border border-stone-400 bg-white rounded-lg"
                        />
                        {errors.email && touched.email && (
                          <p className=" text-red-500  text-sm">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 w-full">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="city"
                          className="font-semibold text-base"
                        >
                          Ciudad
                        </label>
                        <input
                          type="text"
                          name="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          className="w-full p-2 mb-1 border border-stone-400 bg-white rounded-lg"
                        />
                        {errors.city && touched.city && (
                          <p className="text-red-500 text-sm">{errors.city}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 w-full ">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="address"
                          className="font-semibold text-base"
                        >
                          Dirección
                        </label>
                        <input
                          type="text"
                          name="address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                          className=" w-full p-2 mb-1 border border-stone-400 bg-white rounded-lg"
                        />
                        {errors.address && touched.address && (
                          <p className=" text-red-500  text-sm">
                            {errors.address}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="phone"
                          className="font-semibold text-base"
                        >
                          Télefono
                        </label>
                        <input
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          className=" w-full p-2 mb-1 border border-stone-400 bg-white rounded-lg"
                        />
                        {errors.phone && touched.phone && (
                          <p className=" text-red-500  text-sm">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-center mt-4">
                      <button
                        type="submit"
                        className="w-full bg-black text-center text-white font-normal py-3 rounded-sm transition duration-300 disabled:bg-custom-GrisOscuro"
                        disabled
                      >
                        Guardar Datos
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerfilView;
