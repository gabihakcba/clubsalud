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
  id: number
  username: string
  permissions: string[]
}

// Tipo para los datos de sesión
interface SessionData {
  access_token: string
  user: UserData
}

export const setDataSessionClubSalud = (data: SessionData): void => {
  safeLocalStorage.setItem('clubsalud_access_token', data.access_token)
  safeLocalStorage.setItem('user', JSON.stringify(data.user))
}

export const removeDataSessionClubSalud = (): void => {
  safeLocalStorage.removeItem('clubsalud_access_token')
  safeLocalStorage.removeItem('user')
}

export const getDataSessionClubSalud = (): { user: UserData } => {
  const user = safeLocalStorage.getItem('user')
  return {
    user: user ? JSON.parse(user) : { id: 0, username: '', permissions: [] }
  }
}

export const hasPermission = (required: string[]): boolean => {
  const user = getDataSessionClubSalud().user
  const role = user?.permissions
  return required.some((permission) => role?.includes(permission))
}

export const getClubSaludToken = (): string => {
  return safeLocalStorage.getItem('clubsalud_access_token') ?? ''
}

export const hasValidClubSaludToken = (): boolean => {
  const token = getClubSaludToken()
  return token !== '' && token !== 'undefined' && token !== null
}
