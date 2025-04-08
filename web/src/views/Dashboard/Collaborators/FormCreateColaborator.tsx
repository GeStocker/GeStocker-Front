"use client";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { createCollaborator } from "@/services/user/collaborator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllInventory } from "@/services/user/inventory";
import { Info } from "lucide-react";

const registerSchema = Yup.object({
  username: Yup.string().required("El nombre de usuario es obligatorio"),
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
  inventoryId: Yup.string().required("Debe estar asignado a un inventario"),
});

interface FormData {
  username: string;
  email: string;
  password: string;
  inventoryId: string;
}

const FormCreateColaborator = () => {
  const { token } = useAuth();
  const { businessId } = useBusiness();
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState("");
  const [inventories, setInventories] = useState([{ id: "", name: "" }]);

  const router = useRouter();

  const handleOnSubmit = async (
    values: FormData,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!businessId || !token) return;
    try {
      await createCollaborator(token, values);
      toast.success("Colaborador creado con exito");
      resetForm();
      setTimeout(() => {
        router.push("/dashboard/collaborators");
      }, 2000);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al registrar el colaborador:", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al registrar el colaborador:", e);
        toast.error("Error al registrar el colaborador");
      }
    }
  };

  const fetchInventories = async () => {
    if (!token || !businessId) return;
    try {
      const inventories = await getAllInventory(token, businessId);
      setInventories(inventories);
    } catch (error) {
      console.warn("No se pudo traer los Locales", error);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, [token, businessId]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center border shadow-lg w-1/2 p-6 rounded-lg my-8 mx-auto">
      <h1 className="text-left font-semibold text-2xl">Agregar colaborador</h1>
      <p className="flex text-sm text-red-500 mb-4">
        <Info className="w-5 h-5 mr-2" />
          Completa los datos personales y de acceso del colaborador.
      </p>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          inventoryId: "",
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex flex-col gap-1 w-72 mt-1 ">
                <label htmlFor="username" className="font-semibold text-xl">
                  Nombre completo
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className="w-full p-2 mb-2  border border-custom-GrisOscuro bg-background rounded-lg"
                />
                {errors.username && touched.username && (
                  <p className=" text-red-500 text-sm">{errors.username}</p>
                )}
              </div>
              <div className="flex flex-col gap-1 w-72 mt-1">
                <label htmlFor="email" className="font-semibold text-xl">
                    Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className=" w-full p-2 mb-2  border border-custom-GrisOscuro bg-background rounded-lg"
                />
                {errors.email && touched.email && (
                  <p className=" text-red-500  text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 w-72 mt-1 ">
              <label htmlFor="password" className="font-semibold text-xl">
                Contraseña de acceso
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={`w-full p-2 mb-2  border border-custom-GrisOscuro bg-background rounded-lg ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-black"
                  } `}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-5 bottom-3 text-custom-textGris hover:text-custom-casiNegro transition-colors "
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
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              {values.password && !errors.password && (
                <p className="text-green-500 text-sm">Contraseña válida</p>
              )}
            </div>

            {/*ACA EMPIEZA EL SELECT INVENTARIOS*/}
            <div className="flex flex-col gap-1 w-72 mt-1 relative">
              <label htmlFor="inventoryId" className="font-semibold text-xl">
                Local asignado
              </label>
              <input
                id="inventoryId"
                type="text"
                name="inventoryId"
                value={selectedInventory}
                readOnly
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-2 border mb-4 border-custom-GrisOscuro bg-background rounded-lg cursor-pointer disabled:bg-custom-GrisOscuro"
              />
              {isDropdownOpen && (
                <div className="w-full absolute top-18 z-10 p-2 mb-4 border h-fit max-h-60 border-custom-GrisOscuro bg-background rounded-lg cursor-pointer overflow-y-auto">
                  {inventories &&
                    inventories.map((inventory) => (
                      <div
                        key={inventory.id}
                        onClick={() => {
                          setSelectedInventory(inventory.name);
                          setIsDropdownOpen(false);
                          setFieldValue("inventoryId", inventory.id);
                        }}
                        className="p-2 hover:bg-custom-grisClarito cursor-pointer"
                      >
                        {inventory.name}
                      </div>
                    ))}
                </div>
              )}
              {errors.inventoryId && touched.inventoryId && (
                <p className="text-red-500 text-sm">{errors.inventoryId}</p>
              )}
            </div>
            {/*ACA TERMINA EL SELECT INVENTARIOS*/}

            <div className="w-full flex justify-center items-center mt-4 gap-8">
              <Link href="/dashboard/collaborators">
                <Button variant="outline" size="lg">
                  Cancelar
                </Button>
              </Link>

              <Button type="submit" size="lg">
                Registrar
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormCreateColaborator;
