import { apiMedintt } from 'utils/axios.service'
import {
  type UpdateBorrowerEmployee,
  type CreateBorrowerEmployee
} from 'utils/Medintt/types'

export const logInLaboral = async (data: {
  UsuarioWeb: string
  PasswordWeb: string
}): Promise<{ ok: boolean; message: string; data?: any }> => {
  try {
    const response = await apiMedintt.post('/auth/login', data)
    if (response.status === 403) {
      return { ok: false, message: 'Usuario o contraseña incorrectos' }
    } else {
      return { data: response.data, message: 'ok', ok: true }
    }
  } catch (error) {
    const status = error.response.status
    if (status === 403 || status === 404) {
      return { ok: false, message: 'Usuario o contraseña incorrectos' }
    }
    throw new Error('Error en la solicitud')
  }
}

export const getPatientsByBorrower = async (
  idBorrower: string | number
): Promise<{ ok: boolean; message: string; data?: any }> => {
  try {
    const response = await apiMedintt.get(`/patient?id=${idBorrower}`)
    return { data: response.data, message: 'ok', ok: true }
  } catch (error) {
    const status = error.response.status
    if (status === 403 || status === 404) {
      return { ok: false, message: 'Usuario o contraseña incorrectos' }
    }
    throw new Error('Error en la solicitud')
  }
}

export const createBorrowerEmployee = async (
  newEmployee: CreateBorrowerEmployee
): Promise<any> => {
  try {
    const response = await apiMedintt.post('/patient', newEmployee)
    return { data: response.data, message: 'ok', ok: true }
  } catch (error) {
    console.log(error)
    throw new Error(`Error en la solicitud ${error}`)
  }
}

export const updateBorrowerEmployee = async (
  updateEmployee: UpdateBorrowerEmployee
): Promise<any> => {
  const { Id, DNI, ...data } = updateEmployee
  try {
    const response = await apiMedintt.patch(`/patient/${Id}`, data)
    return { data: response.data, message: 'ok', ok: true }
  } catch (error) {
    console.log(error)
    throw new Error(`Error en la solicitud ${error}`)
  }
}

export const deleteBorrowerEmployee = async (id: number): Promise<any> => {
  try {
    const response = await apiMedintt.delete(`/patient/${id}`)
    return { data: response.data, message: 'ok', ok: true }
  } catch (error) {
    console.log(error)
    throw new Error(`Error en la solicitud ${error}`)
  }
}

export const getAusentismos = async (data): Promise<any> => {
  try {
    const response = await apiMedintt.get(
      `/ausentismo?desde=${data.desde}&hasta=${data.hasta}&mesReferencia=${data.mesReferencia}&idEmpresa=${data.idPrestataria}`
    )
    console.log(response)
    return { data: response.data, message: 'ok', ok: true }
  } catch (error) {
    console.log(error)
    throw new Error(`Error en la solicitud ${error}`)
  }
}
