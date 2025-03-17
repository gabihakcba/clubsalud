import { type ReactElement } from 'react'

export default function Services(): ReactElement {
  return (
    <div className='flex flex-column text-primary mt-7 gap-6 font-secondary px-0 sm:px-2 md:px-4 lg:px-8'>
      <span className='text-3xl font-bold'>Servicios Destacados</span>
      <div className='grid nested-grid px-0 sm:px-4 md:px-6 lg:px-8 mx-2'>
        <div className='col-4'>
          <div className='flex flex-column h-full border-2 border-round-3xl overflow-hidden'>
            <span className='text-xl font-bold p-4'>
              🏢 Salud Ocupacional para Empresas
            </span>
            <div className='flex flex-column justify-content-between h-full'>
              <span className='px-4'>
                Cuidá a tu equipo con prevención y bienestar.Evaluaciones
                médicas, capacitaciones en seguridad y programas personalizados.
              </span>
              <ul
                style={{ listStyle: 'none' }}
                className='px-4'
              >
                <li>📌 Consultoría en salud laboral</li>
                <li>📌 Certificaciones</li>
                <li>📌 Monitoreo continuo</li>
              </ul>
              <img
                src='/medintt/image-photoroom.png'
                className='w-11rem align-self-end'
                alt=''
              />
            </div>
          </div>
        </div>
        <div className='col-8'>
          <div className='grid'>
            <div className='col-7'>
              <div className='h-full border-2 border-round-3xl flex flex-column p-4 gap-4'>
                <span className='text-xl font-bold'>
                  🩺 Chequeos Médicos Personalizados
                </span>
                <span>
                  Detectá problemas antes de que sean graves.Chequeos de rutina
                  con especialistas en medicina preventiva y salud integral.
                </span>
              </div>
            </div>
            <div className='col-5'>
              <div className='h-full border-2 border-round-3xl flex flex-column p-4 gap-4'>
                <span>
                  Recuperate y volvé al trabajo con confianza.Terapias
                  especializadas para acelerar la recuperación y prevenir
                  lesiones.
                </span>
                <span className='text-xl font-bold'>
                  🏥 Fisioterapia y Rehabilitación
                </span>
              </div>
            </div>
            <div className='col-5'>
              <div className='h-full border-2 border-round-3xl flex flex-column p-4 gap-4'>
                <span>
                  Prevenir es vivir mejor.Evaluaciones de salud y programas de
                  prevención adaptados a cada persona.
                </span>
                <span className='text-xl font-bold'>
                  🛡️ Medicina Preventiva Integral
                </span>
              </div>
            </div>
            <div className='col-7'>
              <div className='h-full border-2 border-round-3xl flex flex-column p-4 gap-4'>
                <span className='text-xl font-bold'>
                  🧠 Psicología Laboral y Bienestar Mental
                </span>
                <span>
                  Salud emocional para un mejor desempeño.Asesoramiento, manejo
                  del estrés y programas de bienestar.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
