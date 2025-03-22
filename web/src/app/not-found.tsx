import { routes } from '@/routes/routes'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='text-center flex items-center flex-col my-4'>
      <img src="/errorNotFound.jpg" alt="not found foto"
      className='w-96 h-96 rounded-full' />
      <h2>Pagina no encontrada</h2>
      <p>Presiona el siguiente link para volver a Home</p>
      <Link className='text-blue-400' href={routes.home}>Home</Link>
    </div>
  )
}