// ModalContacto.tsx
import React from "react";
import { IoClose } from "react-icons/io5";

const ModalContacto = ({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <div
          onClick={closeModal}
          className="cursor-pointer text-gray-900 flex justify-end ">
            <IoClose className="w-6 h-6"/>
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
            className="w-full py-2 bg-custom-textGris text-white rounded "
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalContacto;
