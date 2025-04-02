import { Formik } from 'formik';
import React from 'react'

const ConfigurarionBusiness = () => {
  return (
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
                    disabled={!modifyEnable}
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
                    disabled={!modifyEnable}
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
                    disabled={!modifyEnable}
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
                    htmlFor="country"
                    className="font-semibold text-base"
                    >
                    País
                    </label>
                    <input
                    type="text"
                    name="country"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    disabled={!modifyEnable}
                    className="w-full p-2 mb-4  border border-stone-400 bg-white rounded-lg"
                    />
                    {errors.country && touched.country && (
                    <p className="text-red-500 text-sm">
                        {errors.country}
                    </p>
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
                    disabled={!modifyEnable}
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
                    disabled={!modifyEnable}
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
                    type="button"
                    className="w-48 bg-black text-center text-white font-normal py-3 rounded-sm transition duration-300 disabled:bg-custom-GrisOscuro"
                    disabled={!modifyEnable}
                    onClick={onClickSetDialog}
                >
                    Guardar Datos
                </button>
                </div>
                {dialogOpen && (
                <ConfirmDialog
                    aceptFunction={() => {
                    handleSubmit();
                    onClickSetDialog();
                    }}
                    cancelFunction={onClickSetDialog}
                    title="Confirmar cambios"
                    message="¿Seguro de que quieres guardar estos cambios?"
                />
                )}
            </form>
            )}
        </Formik>
    </div>
  )
}

export default ConfigurarionBusiness