import axios from "axios"
import { NextResponse } from "next/server"
import { calculatePages, APP } from "utils/const"
import { QueriesResponse, Account, CreateAccount, UpdateAccount } from "utils/types"

export const getTotalPages = async (): Promise<QueriesResponse> => {
  try {
    const response = await axios.get('http://localhost:3000/api/accounts?page=-1')
    if (response.status === 200) {
      return {
        status: response.status,
        data: calculatePages(response.data.total, APP)
      }
    }
    else {
      return {
        status: response.status,
        data: 0
      }
    }
  } catch (error) {
    return {
      status: 500,
      data: 0,
      error: error
    }
  }
}

export const getAccounts = async (page: number = 0): Promise<QueriesResponse> => {
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

export const createAccount = async (data: CreateAccount): Promise<QueriesResponse> => {
  try {
    const response = await axios.post('http://localhost:3000/api/accounts', {
      username: data.username,
      password: data.password,
      permissions: data.permissions
    })
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
      data: 500,
      error: error
    }
  }
}

export const deleteAccount = async (id: number): Promise<QueriesResponse> => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/accounts`, {
      data: {
        id: id
      }
    })
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

export const updateAccount = async (data: UpdateAccount) => {
  try {
    const response = await axios.patch(`http://localhost:3000/api/accounts`, data)

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

export const logOutAccount = async (): Promise<QueriesResponse> => {
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