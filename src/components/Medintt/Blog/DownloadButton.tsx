import { Button } from 'primereact/button'
import { type ReactElement } from 'react'

export default function DownloadButton({
  resource,
  children
}: {
  resource: string
  children: ReactElement
}): ReactElement {
  const handleDownload = async (): Promise<void> => {
    try {
      const response = await fetch(`/resources/${resource}`)
      if (!response.ok) {
        throw new Error('No se encontró el archivo')
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `${resource}`
      document.body.appendChild(link)
      link.click()

      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error al descargar:', error)
      alert('Ocurrió un error al descargar el archivo')
    }
  }
  return (
    <>
      <Button
        className='border-2 m-0 p-0 text-blue-500'
        link
        size='small'
        onClick={handleDownload}
      >
        {children}
      </Button>
    </>
  )
}
