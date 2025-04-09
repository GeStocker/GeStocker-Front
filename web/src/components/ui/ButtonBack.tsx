'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

const ButtonBack:React.FC = () => {
    const router = useRouter();
    const onBack = () => {
        router.back();
    }
    return (
        <div onClick={onBack} className='flex gap-1 text-lg font-semibold cursor-pointer'>
            
            <span className='bg-custom-grisClarito rounded-full h-fit px-2 mx-4'>Volver</span>
        </div>
    )
}

export default ButtonBack