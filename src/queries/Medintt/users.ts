import axios from 'axios'
import { getTokenSession } from 'utils/Medintt/session'
import {
  type UpdateBorrowerEmployee,
  type CreateBorrowerEmployee
} from 'utils/Medintt/types'

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL ?? ''

export const logInLaboral = async (data: {
  UsuarioWeb: string
  PasswordWeb: string
}): Promise<{ ok: boolean; message: string; data?: any }> => {
  try {
    const response = await axios.post(`${BACK_URL}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
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
    const response = await axios.get(`${BACK_URL}/patient?id=${idBorrower}`, {
      headers: { Authorization: `Bearer ${getTokenSession()}` }
    })
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
    const response = await axios.post(`${BACK_URL}/patient`, newEmployee, {
      headers: {
        Authorization: `Bearer ${getTokenSession()}`
      }
    })
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
    const response = await axios.patch(`${BACK_URL}/patient/${Id}`, data, {
      headers: {
        Authorization: `Bearer ${getTokenSession()}`
      }
    })
    return { data: response.data, message: 'ok', ok: true }
  } catch (error) {
    console.log(error)
    throw new Error(`Error en la solicitud ${error}`)
  }
}

export const deleteBorrowerEmployee = async (id: number): Promise<any> => {
  try {
    const response = await axios.delete(`${BACK_URL}/patient/${id}`, {
      headers: {
        Authorization: `Bearer ${getTokenSession()}`
      }
    })
    return { data: response.data, message: 'ok', ok: true }
  } catch (error) {
    console.log(error)
    throw new Error(`Error en la solicitud ${error}`)
  }
}
