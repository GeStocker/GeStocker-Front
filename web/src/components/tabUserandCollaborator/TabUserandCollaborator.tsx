import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ButtonGoogle from "../Button Google/ButtonGoogle"
import LoginView from "@/views/Login/LoginView"
import LoginCollaborator from '@/views/Login/LoginCollaborator'



const TabUserandCollaborator = () => {
  return (
    <div className="relative w-full flex items-center px-60 my-3">
        <Tabs defaultValue="admin" className="w-[400px]"> 
        <div className="flex justify-center">
            <TabsList>
                <TabsTrigger value="admin">Administrador</TabsTrigger>
                <TabsTrigger value="collaborator">Colaborador</TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="admin">
        <div className="flex flex-col flex-1 p-5 mr-10 bg-background justify-center">

                <div className="flex flex-col items-center justify-center flex-1 ml-16 mt-12 mx-4">
                <h2 className="text-4xl font-bold mb-6">Iniciar sesión</h2>
                <div>
                    <ButtonGoogle type='login' plan={null} />
                </div>
                <div className="relative w-full flex items-center my-3">
                    <div className=" flex-grow h-px bg-custom-casiNegro"></div>
                    <span className="mx-4 ">O</span>
                    <div className="flex-grow h-px bg-custom-casiNegro"></div>
                </div>
                <div className="w-full">
                    <LoginView/>
                </div>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="collaborator">
        <div className="flex flex-col items-center text-center justify-center flex-1 mt-12 mx-auto w-full px-4"> 
          <h2 className="text-4xl font-bold mb-6">Iniciar sesión</h2>
          <LoginCollaborator/>
        </div>
      </TabsContent>
        </Tabs>
    </div>
  )
}

export default TabUserandCollaborator
