'use client'

import { useEffect, useState, type ReactElement } from 'react'
import html from '../../../../../public/blogs/lactancia-materna.html'

const loadHtmlContent = async (htmlFile): Promise<string> => {
  try {
    const response = await fetch(`/blogs/${htmlFile}.html`)
    console.log(response)
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo HTML')
    }
    const text = await response.text()
    return text
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export default function BlogTemplate({
  params
}: {
  params: { id: string }
}): ReactElement {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    // if (params.id) {
    //   loadHtmlContent(params.id)
    //     .then((content) => {
    //       setHtmlContent(content)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }
  }, [params])

  return (
    <div>
      <h1>Hola mundo</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
