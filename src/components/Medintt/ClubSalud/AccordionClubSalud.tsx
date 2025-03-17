import { type ReactElement } from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export default function AccordionClubSalud(): ReactElement {
  const router: AppRouterInstance = useRouter()

  return (
    <Accordion activeIndex={0} className='w-25rem'>
      <AccordionTab
        header={() => <span>Beneficios de ser socios</span>}
      >
        <ul className='m-0'>
          <li>Seguimiento médico sin demora</li>
          <li>Instalaciones diseñadas para el ejercicio físico adaptado.</li>
          <li>Orientación profesional constante.</li>
          <li>Horarios flexibles.</li>
          <li>Turnos diferenciados con especialistas de Medintt.</li>
        </ul>
      </AccordionTab>
      <AccordionTab header={() => <span>Club Salud en tu empresa</span>}>
        <p className='m-0'>
          El activo más importante de las empresas son las personas que trabajan
          en ellas. Para que tu equipo de lo mejor, tiene que estar en las
          mejores condiciones de salud. Club Salud está diseñado para mejorar el
          bienestar de tu equipo. Incrementa la productividad, fideliza a tus
          trabajadores, fomenta el compañerismo y mejora la conciliación laboral
          con nuestros programas especializados. Dale un valor añadido a tu
          empresa con Club Salud.
        </p>
      </AccordionTab>
      <AccordionTab
        header={() => <span>Asistencia, docencia e investigación</span>}
      >
        <p className='m-0'>
          Combinamos estos tres elementos para demostrar científicamente cómo el
          ejercicio físico mejora la vida de nuestros socios. Bajo la filosofía
          del Prof. Dr. Sergio Luscher, creemos que la salud se redefine junto a
          los profesores de educación física. Aquí, ellos también desarrollan
          sus conocimientos desde una nueva perspectiva profesional.
        </p>
      </AccordionTab>
      <AccordionTab header={() => <span>Objetivos Club Salud</span>}>
        <ul className='m-0'>
          <li>
            Mejorar la calidad de vida y por ende el bienestar de la población
            mediante el ejercicio sostenido en el tiempo como principal
            herramienta.
          </li>
          <li>
            Promover la salud a través de las prácticas físicas como herramienta
            terapéutica principal, adaptando el ejercicio como parte del
            tratamiento específico de cada persona
          </li>
          <li>
            Crear programas de respaldo y asistencia para incorporar el
            ejercicio como parte de la rutina diaria, utilizando el movimiento
            como terapéutica para mejorar respuestas y funciones alteradas por
            patologías crónicas, síndromes, alteraciones de patrones de
            movimiento, entre muchas.
          </li>
        </ul>
      </AccordionTab>
      <AccordionTab header={() => <span>Valores Club Salud</span>}>
        <ul
          className='m-0'
          style={{ listStyle: 'none' }}
        >
          <li>
            <span className='font-bold'>SALUD INTEGRAL</span>
            <p>
              En Club Salud medicina y deporte se interrelacionan
              constantemente. Sostenemos que la actividad física es salud. De
              acuerdo con la OMS, la salud integra todos los aspectos de la vida
              humana. Las dimensiones del bienestar integran el aspecto físico,
              social, emocional, espiritual, ambiental, ocupacional e
              intelectual de la vida.
            </p>
          </li>
          <li>
            <span className='font-bold'>SALUD INCLUSIVA</span>
            <p>
              La salud inclusiva abarca una gama de enfoques que incluyen el
              abordaje y la disminución del estigma y de las actitudes de
              discriminación y planifica los servicios adaptando los mismos a
              cada paciente para asegurar la accesibilidad plena.
            </p>
          </li>
          <li>
            <span className='font-bold'>ÉTICA Y CALIDAD PROFESIONAL</span>
            <p>
              Club Salud surge de una formación constante en un equipo
              multidisciplinario, que se encarga de dar respaldo y seguimiento
              personalizado al individuo que utiliza el programa. A través del
              monitoreo y acompañamiento profesional, se asegura un servicio de
              calidad.
            </p>
          </li>
        </ul>
      </AccordionTab>
      <AccordionTab header={() => <span>¡Quiero unirme a Club Salud!</span>}>
        <Button
          label='CONTACTANOS AHORA'
          onClick={() => {
            router.push('/contact')
          }}
          className='border-round-3xl'
        />
      </AccordionTab>
    </Accordion>
  )
}
