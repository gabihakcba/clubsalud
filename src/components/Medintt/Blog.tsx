import { type ReactElement } from 'react'
import BlogPreviewItem from './Blog/BlogPreviewItem'

export default function Blog({
  preview = false
}: {
  preview: boolean
}): ReactElement {
  const items = [
    {
      title: 'Semana mundial de la lactancia materna',
      content: `La Semana Mundial de la Lactancia Materna, que se celebra
      todos los años del 1 al 7 de agosto, es una campaña mundial coordinada
      por la Alianza Mundial para la Acción de Lactancia Materna, para crear
      conciencia y estimular la acción sobre temas relacionados con la
      lactanciamaterna.«Apoyar la lactancia materna para un planeta más
      saludable» ha sido seleccionado por la Alianza Mundial para la Lactancia 
      aterna (WABA) [...]`,
      image: '/images/no-image.png'
    },
    {
      title: 'Alcohol - Consumo responsable',
      content: `La promoción de hábitos de vida saludables supone, entre otras
      cosas, un consumo responsable de alcohol, a partir de los 18 años, que
      implica reforzar el compromiso que debe tener tanto la persona que toma
      como la que lo acompaña, impulsando una creciente concientización de los
      riesgos del consumo de bebidas alcohólicas. A lo largo de [...]`,
      image: '/images/no-gracias.jpg'
    },
    {
      title: 'Los cigarrillos electrónicos',
      content: `Y su vinculación a un aumento en el accidente cerebrovascular
      e infarto de miocardio.   El uso de cigarrillos electrónicos está
      relacionado con un riesgo significativamente mayor de resultados adversos
      “duros”, como el accidente cerebrovascular y el infarto de miocardio
      según sugiere una investigación reciente. Entre más de 400,000 encuestados
      mayores de 18 años de [...]`,
      image: '/images/no-image.png'
    },
    {
      title: 'Los cigarrillos electrónicos',
      content: `La Semana Mundial de la Lactancia Materna, que se celebra
      todos los años del 1 al 7 de agosto, es una campaña mundial coordinada
      por la Alianza Mundial para la Acción de Lactancia Materna, para crear
      conciencia y estimular la acción sobre temas relacionados con la
      lactanciamaterna.«Apoyar la lactancia materna para un planeta más
      saludable» ha sido seleccionado por la Alianza Mundial para la Lactancia Materna (WABA) [...]`,
      image: '/images/no-image.png'
    },
    {
      title: 'Los cigarrillos electrónicos',
      content: `La Semana Mundial de la Lactancia Materna, que se celebra
      todos los años del 1 al 7 de agosto, es una campaña mundial coordinada
      por la Alianza Mundial para la Acción de Lactancia Materna, para crear
      conciencia y estimular la acción sobre temas relacionados con la
      lactanciamaterna.«Apoyar la lactancia materna para un planeta más
      saludable» ha sido seleccionado por la Alianza Mundial para la Lactancia Materna (WABA) [...]`,
      image: '/images/no-image.png'
    }
  ]
  return (
    <div className='bg-gray-100 flex flex-column gap-4 justify-content-center align-items-center p-4'>
      <text className='text-purple-700 text-2xl font-bold'>Blog</text>
      <div className='flex flex-wrap gap-6 justify-content-center'>
        {preview && items.slice(0, 3).map((item, index) => (
          <BlogPreviewItem
            key={index}
            item={item}
          />
        ))}
        {!preview && items.map((item, index) => (
          <BlogPreviewItem
            key={index}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}
