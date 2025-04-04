"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";

const ModalContacto = ({
  type,
  text,
  className
}: {
  type: "button" | "text";
  text: string;
  className?: string;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const onClickModal = () => setModalOpen((prev) => !prev);

  if (!isModalOpen)
    return type === "button" ? (
      <Button size="lg" variant="outline" className={twMerge("", className)} onClick={onClickModal}>
        {text}
      </Button>
    ) : (
      <span onClick={onClickModal} className={twMerge("text-sm hover:underline", className)}>{text}</span>
    );

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-background p-6 rounded-lg w-96 shadow-lg">
        <div
          onClick={onClickModal}
          className="cursor-pointer flex justify-end "
        >
          <IoClose className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold mb-4">Contacto</h2>
        <form>
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full p-2 mb-4 bg-custom-grisClarito border border-custom-GrisOscuro rounded"
          />
          <input
            type="email"
            placeholder="Tu correo"
            className="w-full p-2 mb-4 bg-custom-grisClarito border border-gray-300 rounded"
          />
          <textarea
            placeholder="Escribe tu mensaje"
            className="w-full p-2 mb-4 bg-custom-grisClarito border border-gray-300 rounded"
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 bg-custom-textGris text-background rounded "
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalContacto;
