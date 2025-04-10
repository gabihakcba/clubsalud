import { type ReactElement } from 'react'

export default function PageSlugART({
  params
}: {
  params: { slug: string }
}): ReactElement {
  const { slug } = params
  return (
    <div>
      {slug === 'examenes-periodicos' && (
        <div>
          <p className='text-xl font-bold'>Exámenes periodicos</p>
          <p className='font-bold'>Objetivo</p>
          <p>
            Los exámenes periódicos tienen por objetivo la detección precoz de
            afecciones producidas por aquellos agentes de riesgo determinados
            por el Decreto Nº 658/96 a los cuales el trabajador se encuentre
            expuesto con motivo de sus tareas, con el fin de evitar el
            desarrollo de enfermedades profesionales. La realización de estos
            exámenes es obligatoria en todos los casos en que exista exposición
            a los agentes de riesgo mencionados en el decreto 658/96, debiendo
            efectuarse con las frecuencias y contenidos mínimos indicados en el
            ANEXO II del decreto 1338 incluyendo un examen clínico anual.
          </p>
          <p className='font-bold'>Modalidad</p>
          <p>
            Estos exámenes pueden hacerse en las sedes del CMIFR o si el
            empleador quisiera podría realizarse un operativo in Company o con
            la Unidad de Salud Móvil.
          </p>
          <p className='font-bold'>
            {' '}
            Exámenes incluidos en los exámenes periódicos
          </p>
          <p>
            Aquellos exámenes que respondan a la detección en fase precoz y
            reversible de los agentes químicos, físicos, biológicos o por falta
            de ergonomía enumerados en el anexo II del decreto 658/96.
          </p>
        </div>
      )}
      {slug === 'accidentologia' && (
        <div>
          <p className='font-bold text-xl'>Accidentología</p>
          <p className='font-bold'>Objetivo</p>
          <p>
            Brindar un servicio de atención, diagnóstico, tratamiento y
            rehabilitación integral de accidentes laborales y enfermedades
            profesionales para cualquier nivel de complejidad, desde que el
            paciente llega a la clínica hasta lograr la reinserción precoz al
            trabajo, por medio de un abordaje interdisciplinario.
          </p>
          <p className='font-bold'>Modalidad</p>
          <p>Somos expertos en accidentología laboral:</p>
          <ul>
            <li> Trabajamos como prestadores de todas las ART.</li>
            <li> Con atención las 24 hs, los 365 días del año.</li>
            <li>
              Equipo multidisciplinario con todas las especialidades
              relacionadas con la Medicina y Accidentología Laboral
            </li>
            <li> Preparados para atender cualquier patología laboral.</li>
          </ul>
        </div>
      )}
    </div>
  )
}
