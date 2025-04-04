import { developers } from '@/types/developers'
import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

const Developers = () => {
  return (
    <div>
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-center">Desarrolladores</h2>
        <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {developers.map((dev, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center">
            <img
                src={dev.image}
                alt={dev.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{dev.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{dev.role}</p>
            <div className="flex space-x-4">
                <a href={dev.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-6 h-6 hover:text-black" />
                </a>
                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-6 h-6 hover:text-blue-600" />
                </a>
            </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Developers