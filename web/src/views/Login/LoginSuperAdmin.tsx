"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/user/auth";
import { routes } from "@/routes/routes";

const loginSchema = Yup.object({
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

const LoginSuperAdmin: React.FC = () => {
  const router = useRouter();
  const { saveUserData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (values: FormData) => {
    setIsLoading(true);
    try {
      const res = await loginUser(values);
      saveUserData(res.token);
      toast.success("Inicio de sesión exitoso");
      router.push(`${routes.superadminDashboard}/users`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al iniciar sesión:", e.message);
        toast.error(`${e.message}`);
      } else {
        console.warn("Error al iniciar sesión:", e);
        toast.error("Error al iniciar sesión");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center justify-center flex-1 mt-12 mx-auto w-full px-4"> 
          <h2 className="text-4xl font-bold mb-6">Iniciar sesión</h2>
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
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
                  id="email"  
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="w-full p-3 mb-4 border border-custom-casiNegro bg-custom-grisClarito rounded-md"
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
                    id="password"
                    type={!showPassword ? "password" : "text"}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="w-full p-3 mb-4 border border-custom-casiNegro bg-custom-grisClarito rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-5 bottom-3 text-custom-textGris hover:text-custom-textSubtitle transition-colors "
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
                className="w-[250px] bg-custom-casiNegro text-center text-background font-normal py-3 rounded-md transition duration-300"
              >
                {isLoading ? "Cargando..." : "Ingresar"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>  
    </div>
  );
};

export default LoginSuperAdmin;
