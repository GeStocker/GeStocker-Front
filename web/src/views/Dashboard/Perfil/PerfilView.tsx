"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";
import { getUserById, updateUser } from "@/services/user/user";

import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { format } from "date-fns";
import ImagePerfil from "./ImagePerfil";

interface FormData {
  name: string;
  email: string;
  city: string;
  address: string;
  phone: string;
  country: string;
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
  const { token } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    city: "",
    address: "",
    phone: "",
    country: "",
  });
  const [accountData, setAccountData] = useState({
    createdAt: "",
    roles: "",
  });

  const fetchUserData = async () => {
    try {
      const userId = getUserIdFromToken(token ?? "") ?? "";
      const { name, email, city, address, phone, country, createdAt, roles } =
        await getUserById(userId, token ?? "");
      setUserData({
        name: name ?? "",
        email: email ?? "",
        city: city ?? "",
        address: address ?? "",
        phone: phone ?? "",
        country: country ?? "",
      });
      setAccountData({
        createdAt: createdAt ?? "",
        roles: roles?.[0] ?? "",
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
      const userId = getUserIdFromToken(token ?? "") ?? "";
      await updateUser(userId, values);
      toast.info("Se han actualizado los datos correctamente");
      fetchUserData()
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al enviar los nuevos datos:", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al enviar los nuevos datos:", e);
        toast.error("Error al registrar el usuario");
      }
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-4xl text-gray-950 font-bold">Mi perfil</h1>
      <h2 className="text-xl text-custom-textGris">
        Administra tu información personal y preferencias
      </h2>
      <div className="flex">
        <div className="w-1/5 flex flex-col">
          <div className=" p-4 border rounded-md my-8">
            <h2 className="text-xl text-gray-950 font-bold">Foto de perfil</h2>
            <h3 className="text-sm text-custom-textGris">
              Sube una foto para personalizar tu perfil
            </h3>
            <ImagePerfil />
          </div>

          <div className="p-4 border rounded-md gap-1 flex flex-col">
            <h2 className="text-xl text-gray-950 font-bold leading-6">
              Informacion de la cuenta
            </h2>
            <h3 className="text-sm text-custom-textGris mb-4">
              Detalles sobre tu cuenta en GeStocker
            </h3>
            <div className="flex justify-between">
              <span className="text-custom-textGris">Plan actual</span>
              <span className="border border-gray-950 px-4 rounded-xl font-semibold">
                {accountData.roles.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-custom-textGris">Fecha de registro</span>
              {accountData.createdAt ? (
                <span className="text-end">
                  {format(new Date(accountData.createdAt), "yyyy-MM-dd")}
                </span>
              ) : (
                <span className="text-end">No disponible</span>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="Informacion personal" className="w-4/5 p-8">
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
                            className=" w-full p-2 mb-4 border border-stone-400 bg-white rounded-lg"
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
                            className="w-full p-2 mb-4  border border-stone-400 bg-white rounded-lg"
                          />
                          {errors.city && touched.city && (
                            <p className="text-red-500 text-sm">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="city"
                            className="font-semibold text-base"
                          >
                            País
                          </label>
                          <input
                            type="text"
                            name="country"
                            onChange={handleChange}
                            // onBlur={handleBlur}
                            value={values.country}
                            disabled
                            className="w-full p-2 mb-4  border border-stone-400 bg-white rounded-lg disabled:bg-custom-grisClarito disabled:text-custom-textGris"
                          />
                          {/* {errors.country && touched.country && (
                            <p className="text-red-500 text-sm">
                              {errors.country}
                            </p>
                            )} */}
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
                            className=" w-full p-2 mb-4  border border-stone-400 bg-white rounded-lg"
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
                            className=" w-full p-2 mb-4  border border-stone-400 bg-white rounded-lg"
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
                          className="w-48 bg-black text-center text-white font-normal py-3 rounded-sm transition duration-300 disabled:bg-custom-GrisOscuro"
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
    </div>
  );
};

export default PerfilView;
