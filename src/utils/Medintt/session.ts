// utils/ClubSalud/auth.ts

// Función segura para SSR que obtiene un item de localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }
}

// Tipo para los datos del usuario
interface UserData {
  Id: number
  Id_Prestataria: number
  Nombre: string
  UsuarioWeb: string
  Email: string
  // Ausentismos: boolean
  // Pagos: boolean
  // Examenes: boolean
  Cargo: boolean
}

// Tipo para los datos de sesión
interface SessionData {
  access_token: string
  user: UserData
}

export const setDataSessionMedintt = (data: SessionData): void => {
  safeLocalStorage.setItem('medintt_access_token', data.access_token)
  safeLocalStorage.setItem('user', JSON.stringify(data.user))
}

export const removeDataSessionMedintt = (): void => {
  safeLocalStorage.removeItem('medintt_access_token')
  safeLocalStorage.removeItem('user')
  console.log('Sesión de Medintt eliminada')
  console.log('LocalStorage:', getDataSessionMedintt())
}

export const getDataSessionMedintt = (): { user: UserData } => {
  const user = safeLocalStorage.getItem('user')
  return {
    user: user ? JSON.parse(user) : null
  }
}

// export const hasPermission = (required: string[]): boolean => {
//   const user = getDataSessionMedintt().user
//   const role = user?.Cargo
//   return required.some((permission) => role?.includes(permission))
// }

export const getMedinttToken = (): string => {
  return safeLocalStorage.getItem('medintt_access_token') ?? ''
}

export const hasValidMedinttToken = (): boolean => {
  const token = getMedinttToken()
  return token !== '' && token !== 'undefined' && token !== null
}
