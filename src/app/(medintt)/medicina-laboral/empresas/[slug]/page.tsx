import { Divider } from 'primereact/divider'
import { type ReactElement } from 'react'

export default function PageSlugCompanies({
  params
}: {
  params: { slug: string }
}): ReactElement {
  const { slug } = params
  return (
    <div>
      {slug === 'examenes-salud' && (
        <div>
          <p className='text-xl font-bold'>Exámenes de salud</p>
          <p>
            La realización del Exámen Médico Preocupacional es obligatorio y
            tiene como objetivo determinar la aptitud del postulante para
            desempeñarse en el nuevo puesto de trabajo.
          </p>
          <br />
          <p>
            Se cluidos en el sistema de riesgos del trabajo son los siguientes:
          </p>
          <ul>
            <li>Preocupacionales o de ingreso.</li>
            <li>Previos a una transferencia de actividad.</li>
            <li>Posteriores a una ausencia prolongada.</li>
            <li>
              Previos a la terminación de la relación laboral o de egreso.
            </li>
          </ul>
          <p>
            Los exámenes preocupacionales o de ingreso tienen como propósito
            determinar la aptitud del postulante conforme sus condiciones
            psicofísicas para el desempeño de las actividades que se le
            requerirán. En ningún caso pueden ser utilizados como elemento
            discriminatorio para el empleo. Servirán, asimismo, para detectar
            las patologías preexistentes y, en su caso, para evaluar la
            adecuación del postulante -en función de sus características y
            antecedentes individuales- para aquellos trabajos en los que
            estuvieren eventualmente presentes los agentes de riesgo
            determinados por el Decreto Nº 658 de fecha 24 de junio de 1996.
          </p>
          <br />
          <p>
            Los contenidos de estos exámenes serán, como mínimo, los siguientes:
          </p>
          <ul>
            <li>Examen físico completo.</li>
            <li>Análisis de sangre:</li>
            <li>Hemograma completo, eritrosedimentación, uremia, glucemia.</li>
            <li>Radiografía panorámica de tórax (frente).</li>
            <li>Análisis de orina básico.</li>
            <li>Electrocardiograma.</li>
            <li>Estudio de agudeza visual.</li>
            <li>
              Puestos y/o actividades específicas pueden requerir estudios
              adicionales. En caso de preverse la exposición a los agentes de
              riesgo del Decreto Nº 658/96, deberán, además, efectuarse los
              estudios correspondientes a cada agente.
            </li>
          </ul>
        </div>
      )}
      {slug === 'ausentismo' && (
        <div>
          <p className='text-xl font-bold'>Ausentismo</p>
          <p className='font-bold'>Objetivo</p>
          <p>
            La gestión de ausentismo es la mejor manera de agilizar el
            seguimiento del ausentismo de los empleados, pudiendo realizarlo de
            manera presencial como virtual. Esta última evita la necesidad de
            desplazamiento tanto del paciente como del médico.
          </p>
          <p className='font-bold'>¿Qué incluyen nuestros servicios?</p>
          <p>
            Visitas a domicilio: Es importante destacar que no reemplazará al
            servicio de ausentismo tradicional, sino que lo complementará.
            Quienes nos elijan para gestionar el ausentismo de sus empleados
            continuarán teniendo la posibilidad de enviar médicos a domicilio.
          </p>
          <p>
            Atención en nuestros consultorios: En caso de que se requieran
            análisis extras, el paciente podrá atenderse sin necesidad de ser
            derivado, haciendo uso de todas las prestaciones de la clínica
          </p>
          <ul>
            <li>Fonoaudiología</li>
            <li>Ergometría</li>
            <li>Ecografía</li>
            <li>Resonancia magnética</li>
            <li>Espirometría</li>
            <li>Oftalmológico</li>
            <li>Psicodiagnóstico</li>
            <li>Test de drogas</li>
            <li>Otros</li>
          </ul>
          <p>
            Seguimiento virtual de ausentismo: Se trata de un servicio médico a
            distancia que permite verificar y monitorear, mediante una consulta
            virtual, la enfermedad que impide la concurrencia del empleado a su
            lugar de trabajo. Esto supone un ahorro sustancial tanto de tiempo
            como de recursos.
          </p>
        </div>
      )}
      {slug === 'subespecialidades' && (
        <div>
          <p className='text-xl font-bold'>Subespecialidades</p>
          <p className='font-bold'>Nutrición</p>
          <section>
            <p>
              Nuestro objetivo es concientizar a nuestros colaboradores sobre la
              importancia de promover y garantizar una alimentación saludable y
              equilibrada en sus empleados, para así optimizar el rendimiento y
              obtener mejores resultados en la empresa y en la vida diaria.
            </p>
          </section>
          <Divider />
          <p className='font-bold'>Beneficios para las empresas</p>
          <section>
            <p>
              Es bien sabido que una alimentación saludable, combinada con
              actividad física, son fundamentales para el bienestar personal y
              laboral de los empleados. El problema, sin embargo, es que la
              información que suele circular es en muchos casos, confusa, poco
              clara o directamente errónea.
            </p>
            <p>
              Trabajando con nosotros, tus trabajadores van a recibir mensajes
              claros y tendrán la posibilidad de evacuar todas sus consultas y
              dudas respecto a temas de interés nutricional.
            </p>
            <p>
              Por lo tanto, invertir en nuestro servicio de nutrición no solo es
              un beneficio para los trabajadores, sino también para la propia
              empresa.
            </p>
          </section>
        </div>
      )}
      {slug === 'salud-laboral' && (
        <div>
          <p className='text-xl font-bold'>
            Servicio Integral de salud laboral:
          </p>
          <section>
            <p className='font-bold'>
              Aumentá su bienestar, disminuí su ausentismo y fortalecé su
              fidelización con la empresa. Además, te asegurás de cumplir con
              las normas exigidas ante la ART.
            </p>
            <p className='font-bold'>
              ¿Cómo? Mediante la elaboración de un plan integral de salud
              laboral, brindando diferentes opciones adaptadas a las necesidades
              de tu empresa.
            </p>
            <p className='font-bold'>
              Modalidades de nuestro Servicio Integral de Salud Laboral
            </p>
            <p>
              Online
              <br />A través de sesiones online mediante plataformas
              especializadas podrás tener a disposición la asesoría médico
              laboral que necesitas. Podrás contratar sesiones unitarias o
              abonos a tu medida.
            </p>
            <p className='font-bold'>¿Cómo vamos a ayudar a tu empresa?</p>
            <p>
              Asesorías generales y específicas sobre casos tanto en
              enfermedades inculpables como de ART (accidentes laborales y
              enfermedades profesionales).
            </p>
            <p className='font-bold'>
              Seguimiento de consultas. Auditoría de certificados médicos.
            </p>
            <p className='font-bold'>
              Elaboración de informes y recomendaciones.
            </p>
            <p className='font-bold'>
              Planificación de actividades acordes para el cuidado de la salud
              del empleado.
            </p>
            <p className='font-bold'>¡Y mucho más!</p>
          </section>
        </div>
      )}
      {slug === 'capacitaciones' && (
        <div>
          <p className='text-xl font-bold'>Capacitaciones</p>
          <p>
            Estas charlas / talleres pueden darse de manera online o presencial
            y tienen como objetivo impulsar hábitos saludables a través de la
            promoción de la salud.
          </p>
          <p>
            Con el fin de cumplimentar los apartados de la Resolución 905/15,
            podemos brindar las siguientes charlas (solicitar cotización
            aparte):
          </p>
          <p className='font-bold'> Modalidad Online/Presencial</p>
          <ul className='font-bold'>
            <li>
              Dengue: información clara y actualizada para proteger a los
              trabajadores de tu empresa
            </li>
            <li>
              Prevención de adicciones en el ámbito laboral (tabaco, alcohol y
              drogas)
            </li>
            <li>Promoción de la actividad física (sedentarismo)</li>
            <li>Prevención de enfermedades cardiovasculares</li>
            <li>Promoción de alimentación saludable</li>
            <li>Programa de ergonomía</li>
            <li>RCP + Primeros auxilios</li>
            <li>
              Promoción y prevención de la salud mental en el área laboral
            </li>
            <li>Manejo de la voz, cuanto sabemos de ella y como cuidarla</li>
            <li>Toxicología: conceptos generales</li>
            <li>COVID - Información general y conceptos claves</li>
          </ul>
        </div>
      )}
      {slug === 'higiene-y-seguridad' && (
        <div>
          <p className='text-xl font-bold'>Higiene y Seguridad</p>
          <p>
            Brindamos asesoramiento especializado e implementamos planes de
            acción que abarcan todos los aspectos previstos por las normativas
            de H&S vigentes. Ofrecemos soluciones integrales a medida para cada
            organización. Nos enfocamos en la prevención y en el desarrollo de
            acciones junto al Servicio de Salud Ocupacional.
          </p>
          <p className='font-bold'>
            ¿Por qué contratar el servicio de seguridad e higiene en el trabajo?
          </p>
          <ul>
            <li>Para proteger a sus colaboradores de accidentes laborales.</li>
            <li>
              Para evitar multas. Al estar cubiertas con el Servicio de S&H, las
              empresas cumplen con las Normativas Legales vigentes frente a las
              Autoridades de aplicación, ART, Municipalidad, etc.
            </li>
            <li>
              Porque brinda Seguridad para toda la Organización posibilitando
              mejorar los estándares de Calidad, Productividad y Trabajo Sin
              Riesgos.
            </li>
          </ul>
        </div>
      )}
      {slug === 'campanas-vacunacion' && <div>Campañas de Vacunacion</div>}
    </div>
  )
}
