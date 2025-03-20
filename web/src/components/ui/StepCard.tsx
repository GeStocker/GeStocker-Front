import React from 'react'

const StepCard: React.FC<{icon: string, title: string, description: string}> = ({icon, title, description}) => {
  return (
    <div className='flex flex-col gap-3 bg-white h-fit md:h-48 w-full md:w-96 rounded-md items-center p-5'>
        <div className='border rounded-full p-1 bg-custom-GrisOscuro'>
        <img src={icon} alt="Icono del paso" className='w-9 h-9'/>
        </div>
        <h3 className='text-xl font-bold'>{title}</h3>
        <p className='text-lg text-textSubtitle text-center'>{description}</p>
    </div>
  )
}

export default StepCard