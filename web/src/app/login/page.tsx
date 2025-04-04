import TabUserandCollaborator from '@/components/tabUserandCollaborator/TabUserandCollaborator'
import { routes } from '@/routes/routes'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-col w-[554px] p-5 bg-custom-grisClarito min-h-screen">
        <Link href={routes.home} className="flex items-right gap-1 font-bold">
          <img src="logo.png" alt="Logo GeStocker" className="h-6 w-6 dark:invert-100" />
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
    </div>

  )
}

export default Login