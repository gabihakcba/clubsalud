// apiService.js
import axios from 'axios'
import { getMedinttToken } from './Medintt/session'
import { getClubSaludToken } from './ClubSalud/auth'

// Crear instancias de Axios para cada API
const apiMedintt = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MEDINTT_API_URL
})

const apiClubSalud = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLUBSALUD_API_URL
})

const setupClientInterceptors = (): void => {
  // Interceptores para agregar los tokens correspondientes
  apiMedintt.interceptors.request.use((config) => {
    const token = getMedinttToken() // Tu función para obtener el token de medintt
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  apiClubSalud.interceptors.request.use((config) => {
    const token = getClubSaludToken() // Tu función para obtener el token de clubsalud
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}

if (typeof window !== 'undefined') {
  setupClientInterceptors()
}

// Exportar las instancias configuradas
export { apiMedintt, apiClubSalud }
