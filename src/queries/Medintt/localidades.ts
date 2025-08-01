import { apiMedintt } from 'utils/axios.service'

export default async function getLocalidades(): Promise<any> {
  try {
    const response = await apiMedintt.get('/localidades')
    return { data: response.data, message: 'ok', ok: true }
  } catch (error) {
    console.log(error)
    throw new Error(`Error en la solicitud ${error}`)
  }
}
