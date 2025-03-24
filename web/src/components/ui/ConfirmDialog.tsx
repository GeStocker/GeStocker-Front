import React from "react";
import { Button } from "./button";

const ConfirmDialog = ({
  title,
  message,
  aceptFunction,
  cancelFunction,
}: {
  title?: string;
  message?: string;
  aceptFunction: () => void;
  cancelFunction: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
    <div className="fixed inset-0 bg-black/60 z-40"></div>
      <div className="bg-white p-4 rounded-lg w-96 z-40 shadow-lg">
        <div  className="text-left font-bold text-2xl mb-1 w-max-400">

        {title ? <h1>{title}</h1> : <h1>Estas seguro de continuar?</h1>}
        </div>
        <div className="text-sm md:text-base text-custom-textGris text-left mb-1">
        {message && <p>{message}</p>}
        </div>
        <div className="flex gap-3 justify-end mt-8">
          <Button variant="outline" onClick={cancelFunction}>
            Cancelar
          </Button>
          <Button onClick={aceptFunction}>Confirmar</Button>
        </div>
      </div>
    
    </div>
  );
};

export default ConfirmDialog;