import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useBusiness } from "@/context/BusinessContext";

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
  country: Yup.string().required("El país es obligatorio"),
});

const ConfigurationBusiness = () => {
  const { businessList, businessId } = useBusiness();

  const selectedBusiness = businessList.find(b => b.id === businessId);

  const handleOnSubmit = async (values: { 
    name: string; 
    address: string; 
  }) => {
    console.log("Valores actualizados del negocio:", values);
  };

  
  if (!selectedBusiness) {
    return <p className="text-center">Cargando negocio...</p>;
  }

  return (
    <div>
      <Formik
        initialValues={{
          name: selectedBusiness.name || "",
          address: selectedBusiness.address || "",
        }}
        enableReinitialize
        validationSchema={registerSchema}
        onSubmit={handleOnSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
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
                value={values.name}
                className="w-full p-2 border border-custom-GrisOscuro rounded-lg text-custom-textSubtitle"
              />
              {errors.name && touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* <div className="flex flex-col">
              <label htmlFor="taxId" className="font-semibold text-base">
                Identificador Fiscal
              </label>
              <input
                type="text"
                name="taxId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.taxId}
                className="w-full p-2 border border-custom-GrisOscuro rounded-lg text-custom-textSubtitle"
              />
              {errors.taxId && touched.taxId && <p className="text-red-500 text-sm">{errors.taxId}</p>}
            </div> */}

            <div className="grid  gap-4">
              <div className="flex flex-col">
                <label htmlFor="address" className="font-semibold text-base">Dirección</label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className="w-full p-2 border border-custom-GrisOscuro rounded-lg text-custom-textSubtitle"
                />
              </div>

              {/* <div className="flex flex-col">
                <label htmlFor="city" className="font-semibold text-base">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  className="w-full p-2 border border-custom-GrisOscuro rounded-lg text-custom-textSubtitle"
                />
              </div> */}
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              {/* <div className="flex flex-col">
                <label htmlFor="postalCode" className="font-semibold text-base">Código Postal</label>
                <input
                  type="text"
                  name="postalCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.postalCode}
                  className="w-full p-2 border border-custom-GrisOscuro rounded-lg text-custom-textSubtitle"
                />
              </div> */}

              {/* <div className="flex flex-col">
                <label htmlFor="country" className="font-semibold text-base">País</label>
                <input
                  type="text"
                  name="country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  className="w-full p-2 border border-custom-GrisOscuro rounded-lg text-custom-textSubtitle"
                />
              </div>
            </div> */}

            {/* <div className="flex flex-col">
              <label htmlFor="phone" className="font-semibold text-base">Teléfono</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                className="w-full p-2 border border-custom-GrisOscuro rounded-lg text-custom-textSubtitle"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold text-base">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="w-full p-2 border border-custom-GrisOscuro rounded-lg text-custom-textSubtitle"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div> */}

            {/* <div className="w-full flex justify-center mt-4">
              <Button
                type="submit"
                className="w-48 bg-foreground text-background font-normal py-3 rounded-lg transition duration-300 disabled:bg-custom-GrisOscuro"
              >
                Guardar Datos
              </Button>
            </div> */}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ConfigurationBusiness;
