import { type ReactElement } from 'react'

export default function WhyMedintt(): ReactElement {
  return (
    <div className='flex flex-row justify-content-start align-items-center gap-4 md:gap-6 surface-section pb-5'>
      <img
        src='/medintt/whymedintt.png'
        alt=''
        className='h-10rem sm:h-20rem md:h-25rem lg:h-30rem'
      />
      <span className='flex flex-column align-items-start text-primary font-secondary mt-8 pr-2 gap-4'>
        <span className='text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold'>
          ¿Por qué elegir Medintt?
        </span>
        <span>Tu Aliado en Salud Laboral</span>
        <span>
          <span>
            Somos más que un proveedor, somos tu socio estratégico en salud
            ocupacional.
          </span>
          <ul
            style={{ listStyle: 'none' }}
            className='p-0'
          >
            <li>
              <b>✔ Protección total para tu equipo →</b> Prevención y bienestar
              laboral.
            </li>
            <li>
              <b>✔ Cumplimiento garantizado →</b> Evitá sanciones y riesgos
              legales.
            </li>
            <li>
              <b>✔ Mayor productividad →</b> Reducí el ausentismo y promové un
              ambiente saludable.
            </li>
            <li>
              <b>✔ Soluciones certificadas →</b> Servicios avalados y
              efectivos.
            </li>
          </ul>
        </span>
      </span>
    </div>
  )
}
