import { type ReactElement } from 'react'

export default function PageSlugART({
  params
}: {
  params: { slug: string }
}): ReactElement {
  const { slug } = params
  return (
    <div>
      {slug === 'examenes-periodicos' && <div>Exámenes periodicos</div>}
      {slug === 'accidentologia' && <div>Accidentología</div>}
    </div>
  )
}
