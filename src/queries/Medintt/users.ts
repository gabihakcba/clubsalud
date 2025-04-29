import axios from 'axios'

export const logInLaboral = async (data: {
  UsuarioWeb: string
  PasswordWeb: string
}): Promise<{ ok: boolean; message: string; data?: any }> => {
  try {
    const response = await axios.post(
      'https://medintt.store/auth/login',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return { data: response.data, message: 'ok', ok: true }
  } catch (error) {
    const status = error.response.status
    if (status === 403 || status === 404) {
      return { ok: false, message: 'Usuario o contraseña incorrectos' }
    }
    throw new Error('Error en la solicitud')
  }
}
