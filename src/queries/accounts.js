import axios from "axios"
import { calculatePages, APP } from "@/utils/const"

export const getTotalPages = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/accounts?page=-1')
    if (response.status === 200) {
      return {
        status: response.status,
        pages: calculatePages(response.data.total, APP)
      }
    }
    else {
      return {
        status: response.status,
        pages: 0
      }
    }
  } catch (error) {
    return {
      status: 500,
      pages: 0,
      error: error
    }
  }
}

export const getAccounts = async (page=0) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/accounts?page=${page}`)
    if (response.status === 200) {
      return {
        status: response.status,
        data: response.data
      }
    }
    else {
      return {
        status: response.status,
        data: []
      }
    }
  } catch (error) {
    return {
      status: 500,
      error: error,
      data: []
    }
  }
}

export const createAccount = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/api/accounts', {
      id: data.id,
      username: data.username,
      password: data.password,
      permissions: data.permissions
    })
    return response.data
  } catch (error) {
    alert('Algun dato es incorrecto')
    return {}
  }
}

export const deleteAccount = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/accounts`, {data: {id: Number(id)}})
    if (response.status === 200) {
      return {
        status: response.status,
        data: response.data
      }
    }
    else {
      return {
        status: response.status,
        data: {}
      }
    }
  } catch (error) {
    return {
      status: 500,
      data: {},
      error: error
    }
  }
}

export const updateAccount = async (id, data) => {
  try {
    const response = await axios.patch(`http://localhost:3000/api/accounts`, {id: Number(id), ...data})
    if (response.status === 200) {
      return {
        status: response.status,
        data: response.data
      }
    }
    else {
      return {
        status: response.status,
        data: {}
      }
    }
  } catch (error) {
    return {
      status: response.status,
      data: {},
      error: error
    }
  }
}

export const logOutAccount = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/logout')
    if (response.status === 200) {
      return {
        status: response.status,
        data: true
      }
    }
    else {
      return {
        status: response.status,
        data: false
      }
    }
  } catch (error) {
    return {
      status: 500,
      data: false,
      error: error
    }
  }
}