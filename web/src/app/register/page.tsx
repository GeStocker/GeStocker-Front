import ThemeImages from '@/components/ui/ThemeImages';
import { routes } from '@/routes/routes'
import RegisterView from '@/views/Register/RegisterView'
import Link from 'next/link'
import React from 'react'
import { IoCheckmarkSharp } from "react-icons/io5";

const imgUrl = {
  light:
    "https://res.cloudinary.com/dikjpvebs/image/upload/v1743829026/register_light_gfbbcm.webp",
  dark: "https://res.cloudinary.com/dikjpvebs/image/upload/v1743829104/register_dark_j5qlc8.png",
  rustic:
    "https://res.cloudinary.com/dikjpvebs/image/upload/v1743829090/registro_rustic_fdocjq.png",
};

const Register = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-col w-[554px] p-5 bg-custom-grisClarito text-black-900 min-h-screen">
        <Link href={routes.home} className="flex items-right gap-1 font-bold">
          <img src="logo.png" alt="Logo GeStocker" className="h-6 w-6" />
          <span>GeStocker</span>
        </Link>
        <div className="flex flex-col m-4">
          <div className="flex flex-col items-center justify-center w-[458px] m-8">
            <h1 className="text-5xl font-bold">Únete a GeStocker</h1>
            <h1 className="text-xl text-center">Comienza a gestionar tu inventario de forma eficiente en minutos</h1>
          </div>
          <div className="flex flex-col text-xl gap-2">
            <div className="flex gap-3">
              <div className="flex justify-center items-center rounded-full bg-custom-GrisOscuro w-[32px] h-[32px]">
                <IoCheckmarkSharp />
              </div>
              <h4>Configuración rápida</h4>
            </div>
            <div className="flex gap-3">
              <div className="flex justify-center items-center rounded-full bg-custom-GrisOscuro w-[32px] h-[32px]">
                <IoCheckmarkSharp />
              </div>
              <h4>Soporte personalizado</h4>
            </div>
          </div>
          <div className="flex items-center justify-center mt-7">
          <ThemeImages
              imageUrls={imgUrl}
              alt="Logo Register"
              width={1024}
              height={1024}
              className="w-[350px] h-[350px] rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 mr-10 bg-background">
        <div className="flex justify-end">
          <Link href={routes.home}>
            <span>Volver</span>
          </Link>
        </div>

        <div className="flex flex-col flex-1 ml-16 mt-12 mx-4">
          <h2 className="text-4xl font-bold mb-6">Registrarse</h2>
          
          <div className="w-full">
            <RegisterView />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Register