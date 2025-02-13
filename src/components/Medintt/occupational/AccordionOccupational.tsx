'use client'

import { Accordion, AccordionTab } from 'primereact/accordion'
import { type ReactElement } from 'react'
import Span from '../Span'

export default function AccordionOccupational(): ReactElement {
  return (
    <Accordion activeIndex={0}>
      <AccordionTab
        header={() => (
          <Span type='primary'>Exámenes para empresas y ART</Span>
        )}
      >
        <p>
          Realizamos todos los exámenes médicos laborales para empresas y ART.
          Además de los exigidos por la legislación vigente, contamos con
          exámenes complementarios especiales y ofrecemos calidad en el nivel de
          información sobre aspectos determinantes de las personas en el
          trabajo.
        </p>
        <p className='font-bold'>Tipos de exámenes:</p>
        <ul className='m-0'>
          <li>Pre-ocupacionales</li>
          <li>Periódicos</li>
          <li>Post-ocupacionales</li>
          <li>Evaluaciones psicotécnicas</li>
          <li>Exámenes psicométricos</li>
          <li>Exámenes médicos periódicos en terreno</li>
          <li>Auditoría de los exámenes médicos laborales</li>
        </ul>
      </AccordionTab>
      <AccordionTab
        header={() => (
          <Span type='primary'>
            Accidentología y atención médica
          </Span>
        )}
      >
        <p className='m-0'>
          Asistencia médica en caso de accidentes de trabajo o enfermedades
          profesionales. Procuramos determinar el más rápido y efectivo retorno
          a las tareas habituales en óptimas condiciones psicofísicas.
        </p>
        <p className='font-bold'>
          Sabemos que una organización con miembros sanos, activos y cuidados,
          pueden potenciar exponencialmente sus actividades.
        </p>
      </AccordionTab>
      <AccordionTab
        header={() => <Span type='primary'>Ausentismo</Span>}
      >
        <p className='m-0'>
          Nuestra gestión del ausentismo incluye la verificación formal de las
          enfermedades en el consultorio y el análisis de sus principales causas
          médicas. Además se realiza un asesoramiento y seguimiento de la salud
          del personal tanto en lo que concierne a la salud ocupacional como a
          la patología inculpable. Finalmente, se desarrolla en junto con la
          empresa, un conjunto de estrategias orientadas a reducir el ausentismo
          y mejorar la calidad de vida de los colaboradores.
        </p>
        <p className='font-bold'>
          Medintt cuenta con disponibilidad de médicos especializados en
          Medicina Laboral y sus especialidades conexas; con el objeto de
          brindar asesoramiento y atención para el cumplimiento de las normas
          vigentes en el ámbito de la salud ocupacional.
        </p>
      </AccordionTab>
      <AccordionTab
        header={() => (
          <Span type='primary'>
            Capacitaciones virtuales/presenciales
          </Span>
        )}
      >
        <p>
          Desarrollamos planes de capacitación acorde a la legislación vigente y
          a medida de las necesidades de las organizaciones. Su finalidad es
          capacitar al personal para la prevención de enfermedades laborales y
          accidentes de trabajo; siguiendo nuestros objetivos enfocados en la
          salud integral de los colaboradores y su bienestar.
        </p>
        <ul className='m-0'>
          <li>
            Los contenidos de las capacitaciones se desarrollan en función de
            las <b>tareas específicas</b> de su empresa o institución.
          </li>
          <li>
            <b>Planificación</b> anual del programa de capacitación para todos
            los niveles de la empresa.
          </li>
          <li>
            <b>Capacitación</b> del personal mediante conferencias, cursos y
            seminarios especializados en medidas de Higiene y Seguridad.
          </li>
        </ul>
      </AccordionTab>
      <AccordionTab
        header={() => (
          <Span type='primary'>
            Capacitaciones en higiene y seguridad
          </Span>
        )}
      >
        <p>
          Acorde a la legislación vigente, su establecimiento está obligado a
          capacitar a su personal en materia de higiene y seguridad,{' '}
          <b>
            para la prevención de enfermedades laborales y accidentes del
            trabajo, en función de las características propias y riesgos
            específicos de cada puesto de trabajo.
          </b>
        </p>
        <p>
          Todos los cursos se dictan proyectando láminas en Power Point y videos
          relacionados con la actividad. Al finalizar el curso, se toma un
          examen teórico y se entrega un certificado de asistencia.
        </p>
        <p>
          Todos los presentes reciben una carpeta con el material del curso
          dictado. Todos los presenten deben rendir un examen práctico.
        </p>
        <p>
          Todos los cursos son dictados por el Ingeniero Oscar Mario Franchi y
          un profesional ayudante.
        </p>
        <p>
          <b>Algunas de nuestras capacitaciones en Higiene y Seguridad</b>
        </p>
        <ul className='m-0'>
          <li>Curso de operación segura de autoelevador</li>
          <li>Curso de operación segura de tracto elevador articulado</li>
          <li>Curso de operación segura de manipulador telescópico</li>
          <li>
            Curso de operación segura de plataforma elevadora móvil de personas
            (PEMP)
          </li>
          <li>Curso de operación segura de excavadora</li>
          <li>Curso de operación segura de pala y minipala cargadora</li>
          <li>Curso de operación segura de hidrogrúas montadas sobre camión</li>
          <li>Curso de operación segura de hidrogrúas y grúas</li>
          <li>Curso de operación segura de retroexcavadora y cargadora</li>
          <li>Curso de aislamiento de energías peligrosas</li>
          <li>Curso de control de atmósferas explosivas</li>
          <li>Curso de seguridad en el trabajo en altura.</li>
          <li>Curso de manejo defensivo.</li>
          <li>Seguridad en el trabajo basada en el comportamiento.</li>
          <li>
            Curso de identificación de peligros y evaluación de riesgos (IPER)
          </li>
        </ul>
      </AccordionTab>
      <AccordionTab
        header={() => <Span type='primary'>Salud psicolaboral</Span>}
      >
        <p>
          Asesoramos y acompañamos a las organizaciones en gestión de
          ausentismo, prevención de riesgos y promoción de la salud facilitando
          vínculos de confianza y comunicación fluida.
        </p>
        <ul>
          <li>Valoración Psicolaboral por licencias prolongadas</li>
          <li>Interconsulta psiquiátrica-psicológica</li>
          <li>Evaluaciones neurocognitivas</li>
          <li>Psicodiagnóstico laboral</li>
          <li>Entrevista diagnóstica y de orientación en consumo</li>
          <li>Exámenes Psicotécnicos</li>
        </ul>
        <p>
          <b>Evaluaciones</b>
        </p>
        <ul>
          <li>
            <b>Evaluación socio-ambiental:</b> brinda información sobre las
            condiciones de vivienda, integración familiar, estudios, situación
            patrimonial y antecedentes laborales de un postulante.
          </li>
          <li>
            <b>Perfil psicológico:</b> orientado a determinar la aptitud
            psíquica de un candidato para un puesto.
          </li>
          <li>
            <b>Perfil focal:</b> permite valorar la aptitud psíquica de un
            postulante en función de tareas específicas (trabajo de alto riesgo,
            IT, seguridad, conducción de vehículos y call center).
          </li>
          <li>
            <b>Perfil psicológico especial por competencias:</b> permite conocer
            la aptitud psíquica, competencias y habilidades de un candidato en
            relación a un perfil.
          </li>
          <li>
            <b>Evaluación de potencial:</b> integra aspectos de una evaluación
            psicológica y de desempeño para conocer las competencias y aptitudes
            de una persona para ocupar puestos de distinta responsabilidad.
          </li>
        </ul>
      </AccordionTab>
      <AccordionTab
        header={() => (
          <Span type='primary'>Asesoramiento legal previsional</Span>
        )}
      >
        <p className='text-wrap'>
          Asesoramos integralmente a las empresas en el campo de la Medicina
          Legal del Trabajo, Previsional y del Seguro. Analizamos cuidadosamente
          cada situación en particular y diseñamos las mejores alternativas a
          través del trabajo en conjunto con un equipo profesional
          multidisciplinario, proporcionando estrategias en la contestación de
          demandas e impugnación de peritajes, y tabulando incapacidades según
          los baremos de uso cotidiano.
        </p>
        <ul>
          <li>Asesoría, representación y evaluaciones periciales</li>
          <li>
            Homologación de Exámenes Pre Ocupacionales ante el Ministerio de
            Trabajo
          </li>
          <li>
            Informes de Evaluación de Incapacidad, Riesgo Laboral, Periciales y
            Previsionales
          </li>
          <li>Evaluación de Recalificación laboral</li>
          <li>
            Representación en Junta Médica en el Ministerio de Trabajo, SRT y en
            Pericias Médicas Judiciales
          </li>
          <li>Valoracion de incapacidades en el daño corporal</li>
        </ul>
        <p>
          <b>
            Ayudamos a sus colaboradores a alcanzar el máximo potencial de su
            salud con información y herramientas precisas para generar un estilo
            de vida más saludable.
          </b>
        </p>
      </AccordionTab>
    </Accordion>
  )
}
