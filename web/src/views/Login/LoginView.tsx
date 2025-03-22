"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { loginUser } from "@/services/user/user";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const registerSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "El correo tiene un formato invalido"
    )
    .required("El correo es obligatorio"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[@$!%*?&\-.])[A-Za-zñÑ\d@$!%*?&\-.]{8,}$/,
      "Debe tener una mayúscula, una minúscula, un número, un carácter especial (@!%*?&-), y mínimo 8 caracteres"
    )
    .required("La contraseña es obligatoria"),
});

interface FormData {
  email: string;
  password: string;
}

const LoginView: React.FC = () => {
  const router = useRouter();
  const { saveUserData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (values: FormData) => {
    try {
      const res = await loginUser(values);
      console.log(res.token);
      saveUserData(res.token);
      toast.success("Inicio de sesión exitoso");

      setTimeout(() => {
        router.push(routes.dashboard);
      }, 2000);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al registrar el usuario:", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al registrar el usuario:", e);
        toast.error("Error al registrar el usuario");
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
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
                  htmlFor="email"
                  className="font-semibold text-xl self-start"
                >
                  Correo
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="w-full p-3 mb-4 border border-black bg-gray-100 rounded-md"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col w-[350px]">
                <label
                  htmlFor="password"
                  className="font-semibold text-xl self-start"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={!showPassword ? "password" : "text"}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="w-full p-3 mb-4 border border-black bg-gray-100 rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-5 bottom-3 text-gray-500 hover:text-gray-700 transition-colors "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEye size={22} />
                    ) : (
                      <FaEyeSlash size={22} />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className=" text-red-500  text-sm">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
              <button
                type="submit"
                className="w-[250px] bg-black text-center text-white font-normal py-3 rounded-md transition duration-300"
              >
                Ingresar
              </button>
            </div>
          </form>
        )}
      </Formik>
      <div className="flex items-center justify-center text-center gap-2 text-black-600">
        <h4>¿No tienes una cuenta? Registrate</h4>
        <Link href={routes.register}>
          <h4 className="text-red-500">Aquí</h4>
        </Link>
      </div>
    </div>
  );
};

export default LoginView;
