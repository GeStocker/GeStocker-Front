"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";
import { getUserById, updateUser, uploadImageUser } from "@/services/user/user";

import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { format } from "date-fns";
import { Camera, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaPencil, FaXmark } from "react-icons/fa6";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { useSearchParams } from "next/navigation";

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
  country: Yup.string().required("El pais es obligatorio"),
});

const PerfilView = () => {
  const { token, saveUserData, saveUserPicture, resetUserData} = useAuth();

  const [modifyEnable, setModifyEnable] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogFotoOpen, setDialogFotoOpen] = useState(false);

  const onClickSetDialog = () => {
    setDialogOpen((prev) => !prev);
  };
  const onClickSetFotoDialog = () => {
    setDialogFotoOpen((prev) => !prev);
  };
  const onClickSetModify = () => {
    setModifyEnable((prev) => !prev);
  };

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
  const [userImage, setUserImage] = useState<string | null>("/sin_foto.webp");
  const [fileImage, setFileImage] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const isBanned = searchParams.get("banned") || false;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImageToBack = async () => {
    if (!fileImage) return;
    try {
      const userId = getUserIdFromToken(token ?? "") ?? "";
      await uploadImageUser(userId, token ?? "", fileImage);
      toast.info("Se ha actualizado la imagen correctamente");
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al subir la imagen:", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al subir la imagen:", e);
        toast.error("Error al subir la imagen");
      }
    }
  };

  const removeImage = () => {
    setUserImage("/sin_foto.webp");
    setFileImage(null);
  };

  const fetchUserData = async () => {
    try {
      if (!token) return;
      const userId = getUserIdFromToken(token ?? "") ?? "";
      const {
        name,
        email,
        city,
        address,
        phone,
        country,
        createdAt,
        roles,
        img,
      } = await getUserById(userId, token ?? "");
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
      if (!img) {
        setUserImage("/sin_foto.webp");
        return;
      }
      setUserImage(img);
      saveUserPicture(img);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al guardar los datos:", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al guardar los datos:", e);
        toast.error("Error al guardar los datos");
      }
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenUrl = urlParams.get("token");
    if (tokenUrl) saveUserData(tokenUrl);
    if (token) fetchUserData();
  }, [token]);

  const handleOnSubmit = async (values: FormData) => {
    try {
      const userId = getUserIdFromToken(token ?? "") ?? "";
      await updateUser(userId, token ?? "", values);
      toast.info("Se han actualizado los datos correctamente");
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al enviar los nuevos datos:", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al enviar los nuevos datos:", e);
        toast.error("Error al guardar los datos");
      }
    }
  };

  useEffect(() => {
      if (isBanned) {
        resetUserData();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Mi perfil</h1>
      <h2 className="text-xl text-custom-textGris">
        Administra tu información personal y preferencias
      </h2>
      <div className="flex">
        <div className="w-1/5 flex flex-col">
          <div className=" p-4 border rounded-md my-8">
            <h2 className="text-xl font-bold">Foto de perfil</h2>
            <h3 className="text-sm text-custom-textSubtitle">
              Sube una foto para personalizar tu perfil
            </h3>
            <div className="flex flex-col items-center">
              <div className=" relative">
                <img
                  src={userImage ?? "/sin_foto.webp"}
                  alt="User Profile"
                  className="w-40 h-40 rounded-full"
                />
                <div className="absolute -right-2 -bottom-2">
                  <label htmlFor="profile-image" className="cursor-pointer">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                      <Camera className="h-4 w-4" />
                    </div>
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              {userImage && (
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClickSetFotoDialog}
                  >
                    Guardar foto
                  </Button>
                  {dialogFotoOpen && (
                    <ConfirmDialog
                      aceptFunction={() => {
                        sendImageToBack();
                        onClickSetFotoDialog();
                      }}
                      cancelFunction={onClickSetFotoDialog}
                      title="¿Quieres guardar esta foto?"
                    />
                  )}
                  <Button variant="outline" size="sm" onClick={removeImage}>
                    <Trash2 className="h-4 w-4" />
                    Descartar
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border rounded-md gap-1 flex flex-col">
            <h2 className="text-xl  font-bold leading-6">
              Informacion de la cuenta
            </h2>
            <h3 className="text-sm text-custom-textSubtitle mb-4">
              Detalles sobre tu cuenta en GeStocker
            </h3>
            <div className="flex justify-between">
              <span className="text-custom-textOscuro">Plan actual</span>
              <span className="border px-4 rounded-xl font-semibold text-sm">
                {accountData.roles.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-custom-textOscuro">Fecha de registro</span>
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Informacion personal">
              Informacion personal
            </TabsTrigger>
            <TabsTrigger value="Seguridad">
              Seguridad
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Informacion personal">
            <section className="w-full p-4 border rounded-md">
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">
                    Datos personales
                  </h2>
                  <h3 className="text-base text-custom-textGris">
                    Actualiza tus informacion personal
                  </h3>
                </div>
                <div>
                  {modifyEnable ? (
                    <FaXmark onClick={onClickSetModify} className="w-6 h-6" />
                  ) : (
                    <FaPencil onClick={onClickSetModify} className="w-6 h-6" />
                  )}
                </div>
              </div>
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
                            id="name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            disabled={!modifyEnable}
                            className=" w-full p-2 mb-4 border border-custom-casiNegro bg-background rounded-lg"
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
                            id="email"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            disabled
                            className=" w-full p-2 mb-4 border border-custom-casiNegro bg-custom-GrisOscuro rustic:bg-custom-marronClarito rounded-lg cursor-not-allowed"
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
                            id="city"
                            type="text"
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            disabled={!modifyEnable}
                            className="w-full p-2 mb-4  border border-custom-casiNegro bg-background rounded-lg"
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
                            id="country"
                            type="text"
                            name="country"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.country}
                            disabled={!modifyEnable}
                            className="w-full p-2 mb-4  border border-custom-casiNegro bg-background rounded-lg"
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
                            id="address"
                            type="text"
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            disabled={!modifyEnable}
                            className=" w-full p-2 mb-4  border border-custom-casiNegro bg-background rounded-lg"
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
                            id="phone"
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            disabled={!modifyEnable}
                            className=" w-full p-2 mb-4  border border-custom-casiNegro bg-background rounded-lg"
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
                          className="w-48 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 text-center font-normal py-3 rounded-sm transition duration-300 disabled:bg-primary/30"
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
            </section>
          </TabsContent>
            <TabsContent value="Seguridad">
              <section className="w-full p-4 border rounded-md">
                <div className="flex justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Seguridad</h2>
                    <h3 className="text-base text-custom-textGris">
                      Cambia tu contraseña y mantén tu cuenta segura
                    </h3>
                  </div>
                </div>

              <div className="flex flex-col gap-2">
                <p className="mb-4">
                  ¿Quieres cambiar tu contraseña?{' '}
                </p>
                  <Link href={routes.passwordRecovery}>
                    <Button
                      >
                      Hazlo aquí
                    </Button>
                  </Link>
              </div>
              </section>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerfilView;
