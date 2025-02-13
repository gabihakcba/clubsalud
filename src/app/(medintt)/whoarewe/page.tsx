import Span from 'components/Medintt/Span'
import { Divider } from 'primereact/divider'
import { type ReactElement } from 'react'

export default function Whoweare(): ReactElement {
  return (
    <div className='flex flex-column align-items-center align-self-center mt-6 gap-8 max-w-full h-screen'>
      <Span className='font-bold text-2xl' type='primary'>¿Quienes somos?</Span>
      <Divider className='m-1'/>
      <span className='font-bold text-center px-4'>
        Basados en el concepto moderno de la integración de las especialidades
        médicas y optimizando la visión integral del paciente desarrollamos
        MEDINTT.
      </span>
      <section className='flex lg:flex-row flex-column gap-8 px-4'>
        <span className='flex flex-column align-items-center gap-4 max-w-25rem text-center'>
          <Span className='font-blod text-2xl' type='primary'>Misión</Span>
          <span>
            Enfocados en tu bienestar, brindamos atención médica de calidad con
            compromiso, trabajo en equipo y mejora continua. Tu salud es nuestra
            especialidad.
          </span>
        </span>
        <span className='flex flex-column align-items-center gap-4 max-w-25rem text-center'>
          <Span className='font-blod text-2xl' type='primary'>Visión</Span>
          <span>
            Ser el líder en la promoción de la salud integral en la región.
            Impulsamos una comunidad equilibrada, que trasciende las barreras
            médicas con innovación y compromiso inquebrantables. Fusionamos la
            medicina con la calidad humana de nuestros profesionales.
          </span>
        </span>
        <span className='flex flex-column align-items-center gap-4 max-w-25rem'>
          <Span className='font-blod text-2xl' type='primary'>Valores</Span>
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
