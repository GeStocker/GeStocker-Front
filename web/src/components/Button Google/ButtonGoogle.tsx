"use client";
import { API } from "@/services/user/user";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const ButtonGoogle: React.FC<{
  plan: string | null;
  type: "login" | "register";
}> = ({ plan, type }) => {
  return (
    <div className="w-full flex justify-center items-center mt-4">
      {type === "login" ? (
        <a
          href={`${API}/auth/google`}
          className="w-[350px] flex justify-center items-center bg-custom-grisClarito text-center font-normal py-3 rounded-md"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center mr-2">
              <FcGoogle />
            </div>
            <span>Conectarse con Google</span>
          </div>
        </a>
      ) : plan && type === "register" ? (
        <a
          href={`${API}/auth/google/?plan=${plan}`}
          className="w-[350px] flex justify-center items-center bg-custom-grisClarito text-center font-normal py-3 rounded-md"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center mr-2">
              <FcGoogle />
            </div>
            <span>Conectarse con Google</span>
          </div>
        </a>
      ) : (
        <div className="w-[350px] flex justify-center items-center bg-custom-grisClarito text-custom-GrisOscuro font-normal py-3 rounded-md cursor-not-allowed">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center mr-2">
              <FcGoogle />
            </div>
            <span>Conectarse con Google</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonGoogle;
