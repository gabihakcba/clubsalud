import { type ReactElement } from 'react'

export default function ClubSalud(): ReactElement {
  return (
    <div className='grid w-full mt-7 justify-content-center bg-purple-200 max-h-25rem p-0 m-0'>
      <div className='col-7'>
        <div className='h-full text-primary flex flex-column gap-2 lg:gap-4 px-0 sm:px-2 lg:p-4 xl:px-8'>
          <span className='font-bold text-xl sm:text-2xl lg:text-3xl'>Club salud</span>
          <span>
            Club Salud es un gimnasio dentro de Medintt dirigido a recuperar,
            mejorar y fomentar la salud a través del <b>movimiento</b>.
            Utilizamos el ejercicio físico para mejorar respuestas y funciones
            alteradas por patologías crónicas, síndromes y alteraciones de
            patrones de movimiento.
          </span>
          <span>
            <ul
              style={{ listStyle: 'none' }}
              className='p-0'
            >
              <li>
                ✔ Salud Integral: Una atención completa para tu cuerpo y mente.
              </li>
              <li>
                ✔ Profesionales Especializados: Un equipo multidisciplinario
                dedicado a tu bienestar.
              </li>
              <li>
                ✔ Exclusividad y Elegancia: Un espacio diseñado para ofrecerte
                una experiencia única.
              </li>
              <li>
                ✔ Planes Personalizados: Programas adaptados a tus necesidades
                y objetivos.
              </li>
            </ul>
          </span>
        </div>
      </div>
      <div className='col-5 m-0 p-0'>
        <div
          style={{
            width: '100%',
            height: '400px' /* Ajusta la altura según sea necesario */,
            overflow: 'hidden' /* Evita que la imagen se desborde */,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className='flex justify-content-end'
        >
          <img
            src='/medintt/clubsalud.png'
            alt=''
            className='h-full'
          />
        </div>
      </div>
    </div>
  )
}
