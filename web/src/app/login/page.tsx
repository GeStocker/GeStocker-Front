// import ButtonGoogle from '@/components/Button Google/ButtonGoogle'
import TabUserandCollaborator from '@/components/tabUserandCollaborator/TabUserandCollaborator'
import { routes } from '@/routes/routes'
// import LoginView from '@/views/Login/LoginView'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-col w-[554px] p-5 bg-gray-100 text-black-900 min-h-screen">
        <Link href={routes.home} className="flex items-right gap-1 font-bold">
          <img src="logo.png" alt="Logo GeStocker" className="h-6 w-6" />
          <span>GeStocker</span>
        </Link>
        <div className="flex flex-col m-4">
          <div className="flex flex-col items-center justify-center w-[458px] m-8">
            <h1 className="text-5xl text-center font-bold">¡Bienvenido de nuevo a GeStocker!</h1>
          </div>
          <div className="flex items-center justify-center mt-7">
            <img src="gestocker1.png" alt="Logo Register" className="w-[350px] h-[350px] rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5 mr-10 bg-background">
        <div className="flex justify-end">
          <Link href={routes.home}>
              <span>Volver</span>
          </Link>
        </div>
        <TabUserandCollaborator/>
      </div>

      {/* <div className="flex flex-col flex-1 p-5 mr-10 bg-background">
        <div className="flex justify-end">
          <Link href={routes.home}>
            <span>Volver</span>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 ml-16 mt-12 mx-4">
          <h2 className="text-4xl font-bold mb-6">Iniciar sesión</h2>
          <div>
              <ButtonGoogle type='login' plan={null} />
          </div>
          <div className="relative w-full flex items-center px-60 my-3">
              <div className=" flex-grow h-px bg-gray-800"></div>
              <span className="mx-4 text-black">O</span>
              <div className="flex-grow h-px bg-gray-800"></div>
          </div>
          <div className="w-full">
            <LoginView/>
          </div>
        </div>
      </div> */}
    </div>

  )
}

export default Login