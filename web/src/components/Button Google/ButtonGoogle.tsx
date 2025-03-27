"use client";
import { API } from '@/services/user/user';
import axios from 'axios';
import React from 'react';
import { FcGoogle } from "react-icons/fc";


const ButtonGoogle: React.FC = () => {
  // const api = axios.create({
  //   baseURL: API,
  //   withCredentials: true
  // })
  return (
    <div className="w-full flex justify-center items-center mt-4">
    <a
        href={`${API}/auth/google`}
        className="w-[350px] flex justify-center items-center bg-gray-100 text-center text-black font-normal py-3 rounded-md"
    >
        <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
            <FcGoogle />
            </div>
            <span>Conectarse con Google</span>
        </div>
    </a>
</div>
  )
}

export default ButtonGoogle