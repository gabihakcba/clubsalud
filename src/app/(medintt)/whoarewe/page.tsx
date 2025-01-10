import { Divider } from 'primereact/divider'
import { type ReactElement } from 'react'

export default function Whoweare(): ReactElement {
  return (
    <div className='flex flex-column align-items-center align-self-center  mt-6 gap-8 max-w-full h-screen'>
      <span className='font-bold text-2xl text-green-500'>¿Quienes somos?</span>
      <Divider className='m-1'/>
      <span className='font-bold'>
        Basados en el concepto moderno de la integración de las especialidades
        médicas y optimizando la visión integral del paciente desarrollamos
        MEDINTT.
      </span>
      <section className='flex gap-4 px-8 mx-8'>
        <span className='flex flex-column align-items-center gap-4 w-25rem'>
          <span className='font-blod text-2xl text-blue-600'>Misión</span>
          <span>
            Enfocados en tu bienestar, brindamos atención médica de calidad con
            compromiso, trabajo en equipo y mejora continua. Tu salud es nuestra
            especialidad.
          </span>
        </span>
        <span className='flex flex-column align-items-center gap-4 w-25rem'>
          <span className='font-blod text-2xl text-blue-600'>Visión</span>
          <span>
            Ser el líder en la promoción de la salud integral en la región.
            Impulsamos una comunidad equilibrada, que trasciende las barreras
            médicas con innovación y compromiso inquebrantables. Fusionamos la
            medicina con la calidad humana de nuestros profesionales.
          </span>
        </span>
        <span className='flex flex-column align-items-center gap-4 w-25rem'>
          <span className='font-blod text-2xl text-blue-600'>Valores</span>
          <ul>
            <li>Mejora continua y calidad en los procesos.</li>
            <li>Vocación de servicio.</li>
            <li>Compromiso y responsabilidad.</li>
            <li>Trabajo en equipo profesional.</li>
          </ul>
        </span>
      </section>
    </div>
  )
}
