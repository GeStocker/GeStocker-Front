"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { completeSubscription } from "@/services/user/auth";
import { routes } from "@/routes/routes";

const SubscriptionSuccess = () => {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  // Obtener el session_id de los parámetros de URL
  useEffect(() => {
    const session_id = searchParams.get("session_id");
    if (session_id) {
      setSessionId(session_id);
    } else {
      setError("No se encontró un ID de sesión válido.");
      setLoading(false);
    }
  }, [searchParams]);

  // Completar la suscripción usando el servicio
  useEffect(() => {
    if (!sessionId) return;

    const handleSubscription = async () => {
      try {
        setLoading(true);
        await completeSubscription(sessionId); // Llamada al servicio
        setTimeout(() => {
          router.push(routes.login);
        }, 1000);
        setSuccess(true);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    handleSubscription();
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <Image src="/logo.png" alt="snappy" width={150} height={150} className="dark:invert-100"/>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-custom-casiNegro mt-8 text-center">
        {loading
          ? "Verificando tu pago..."
          : success
          ? "¡Pago Exitoso!"
          : "Error en la suscripción"}
      </h1>
      {loading ? (
        <p className="text-custom-textSubtitle mt-4 text-center">
          Por favor, espera mientras verificamos tu pago.
        </p>
      ) : success ? (
        <p className="text-custom-textSubtitle mt-4 text-center">
          ¡Gracias por suscribirte a GeStocker! Ahora eres parte de nuestra
          comunidad.
        </p>
      ) : (
        <p className="text-red-600 mt-4 text-center">{error}</p>
      )}
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-custom-textGris text-background rounded hover:bg-custom-textSubtitle text-center"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SubscriptionSuccess />
    </Suspense>
  );
}
