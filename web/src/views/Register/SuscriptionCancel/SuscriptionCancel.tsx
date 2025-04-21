"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/routes/routes";

const SubscriptionCancel = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    if (!session_id) {
      setError("Por favor, inicia sesión de nuevo para completar el pago.");
      setLoading(false);
      setTimeout(() => {
        router.push(routes.login);
      }, 5000);
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <Image src="/logo.png" alt="snappy" width={150} height={150} className="dark:invert-100" />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-custom-casiNegro mt-8 text-center">
        {loading ? "Procesando..." : "Pago Cancelado"}
      </h1>
      {loading ? (
        <p className="text-custom-textSubtitle mt-4 text-center">Por favor, espera un momento...</p>
      ) : (
        <p className="text-red-600 mt-4 text-center">{error}</p>
      )}
      <Link
        href={routes.login}
        className="mt-6 px-4 py-2 bg-custom-textGris text-background rounded hover:bg-custom-textSubtitle text-center"
      >
        Iniciar sesión
      </Link>
    </div>
  );
};

export default function SubscriptionCancelPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SubscriptionCancel />
    </Suspense>
  );
}