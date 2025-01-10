import axios from 'axios'
import { path } from 'utils/ClubSalud/path'

export const getExcel = async (): Promise<any> => {
  const response = await axios.get(`${path()}/api/excel`, {
    responseType: 'blob'
  })
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'exported-data.xlsx') // Nombre del archivo descargado
  document.body.appendChild(link)
  link.click()

  // Limpiar la URL creada después de la descarga
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
  return response.data
}
