import axios from 'axios'

export default async function getLocalidades(): Promise<any> {
  try {
    const response = await axios.get('https://medintt.store/localidades', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return { data: response.data, message: 'ok', ok: true }
  } catch (error) {
    console.log(error)
    throw new Error(`Error en la solicitud ${error}`)
  }
}
