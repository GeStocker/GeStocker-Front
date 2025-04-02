import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";

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
  country: Yup.string().required("El pais es obligatorio"),
});

const ConfigurationBusiness = () => {

  const handleOnSubmit = async () => {
    console.log("negocios")
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          taxId: "",
          address: "",
          city: "",
          postalCode: "",
          country: "",
          phone: "",
          email: "",
        }}
        enableReinitialize
        validationSchema={registerSchema}
        onSubmit={handleOnSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-4 ">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold text-base">
                  Nombre del Negocio
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="Mi negocio"
                  className="w-full p-2 border border-gray-400 rounded-lg text-gray-700"
                />
                {errors.name && touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="taxId" className="font-semibold text-base">
                  Identificador Fiscal
                </label>
                <input
                  type="text"
                  name="taxId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="296909587"
                  className="w-full p-2 border border-gray-400 rounded-lg text-gray-700"
                />
                {errors.taxId && touched.taxId && <p className="text-red-500 text-sm">{errors.taxId}</p>}
              </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="address" className="font-semibold text-base">Dirección</label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="Calle siempre viva 123"
                  className="w-full p-2 border border-gray-400 rounded-lg text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="city" className="font-semibold text-base">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="Villavicencio"
                  className="w-full p-2 border border-gray-400 rounded-lg text-gray-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="postalCode" className="font-semibold text-base">Código Postal</label>
                <input
                  type="text"
                  name="postalCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="500001"
                  className="w-full p-2 border border-gray-400 rounded-lg text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="country" className="font-semibold text-base">País</label>
                <input
                  type="text"
                  name="country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="Colombia"
                  className="w-full p-2 border border-gray-400 rounded-lg text-gray-700"
                />
              </div>
            </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="font-semibold text-base">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="637247094"
                  className="w-full p-2 border border-gray-400 rounded-lg text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold text-base">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="admin@tiendaprincipal.com"
                  className="w-full p-2 border border-gray-400 rounded-lg text-gray-700"
                />
              </div>

            <div className="w-full flex justify-center mt-4">
              <Button
                type="button"
                className="w-48 bg-black text-white font-normal py-3 rounded-lg transition duration-300 disabled:bg-gray-500"
              >
                Guardar Datos
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ConfigurationBusiness;