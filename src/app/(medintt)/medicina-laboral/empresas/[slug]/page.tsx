import { type ReactElement } from 'react'

export default function PageSlugCompanies({
  params
}: {
  params: { slug: string }
}): ReactElement {
  const { slug } = params
  return (
    <div>
      {slug === 'examenes-salud' && <div>Exámenes de salud</div>}
      {slug === 'ausentismo' && <div>Ausentismo</div>}
      {slug === 'subespecialidades' && <div>Subespecialidades</div>}
      {slug === 'salud-laboral' && (
        <div>Servicio integral de salud laboral</div>
      )}
      {slug === 'capacitaciones' && <div>Capacitaciones</div>}
      {slug === 'higiene-y-seguridad' && <div>Higiene y Seguridad</div>}
      {slug === 'campanas-vacunacion' && <div>Campañas de Vacunacion</div>}
    </div>
  )
}
