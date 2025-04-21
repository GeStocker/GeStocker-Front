"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { banUser, unbanUser } from "@/services/user/superadmin";
import { toast } from "sonner";

const banSchema = Yup.object({
  reason: Yup.string()
    .min(10, "El motivo debe tener al menos 10 caracteres")
    .required("El motivo es obligatorio"),
});

const BanUnbanUser = ({
  name,
  type,
  token,
  userId,
  onClose,
  onSuccess,
}: {
  name: string;
  type: "ban" | "unban";
  token: string;
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const onClickUnban = async () => {
    if (!token) return;
    try {
      setLoading(true);
      await unbanUser(token, userId);
      toast.success("Usuario desbaneado con éxito");
      onSuccess();
    } catch (error) {
      console.warn(error);
      toast.error("No se pudo desbanear al usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-foreground/60 z-40"></div>
      <div className="bg-background p-4 rounded-lg w-96 z-40 shadow-lg">
        <div className="text-left font-bold text-2xl mb-1 w-max-400">
          {type === "ban" ? (
            <h1>{`Banear a ${name}`}</h1>
          ) : (
            <h1>{`Desbanear a ${name}`}</h1>
          )}
        </div>
        {type === "ban" ? (
          <Formik
            initialValues={{ reason: "" }}
            validationSchema={banSchema}
            onSubmit={async (values) => {
              if (!token) return;
              try {
                setLoading(true);
                await banUser(token, userId, values.reason);
                toast.success("Usuario baneado con éxito");
                onSuccess();
              } catch (error) {
                console.warn(error);
                toast.error("No se pudo banear al usuario");
              } finally {
                setLoading(false);
              }
            }}
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
                      htmlFor="reason"
                      className="font-semibold text-xl self-start"
                    >
                      Motivo
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.reason}
                      className="w-full p-3 mb-4 border border-custom-casiNegro bg-custom-grisClarito rounded-md"
                    />
                    {errors.reason && touched.reason && (
                      <p className="text-red-500 text-sm">{errors.reason}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 justify-end mt-8">
                  {!loading && (
                    <Button variant="outline" onClick={onClose}>
                      Cancelar
                    </Button>
                  )}
                  <Button type="submit" disabled={loading}>
                    {!loading ? "Confirmar" : "Enviando"}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <div className="flex gap-3 justify-end mt-8">
            {!loading && (
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            )}
            <Button onClick={onClickUnban} disabled={loading}>
              {!loading ? "Confirmar" : "Enviando"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BanUnbanUser;
