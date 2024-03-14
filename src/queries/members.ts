import { CreateMember, Member, QueriesResponse } from "utils/types"
import { calculatePages, APP } from "utils/const"
import axios from "axios"

export const getMembers = async (page: number = 0): Promise<QueriesResponse> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/members?page=${page}`)
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

export const getTotalPagesM = async (): Promise<QueriesResponse> => {
  try {
    const response = await axios.get('http://localhost:3000/api/members?page=-1')
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

export const createMember = async (newMember: CreateMember): Promise<QueriesResponse> => {
  try {
    const response = await axios.post('http://localhost:3000/api/members', {
      ...newMember
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
        data: {},
        error: response.data
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

export const deleteMember = async (id: number): Promise<QueriesResponse> => {
  try {
    const response = await axios.delete('http://localhost:3000/api/members', {
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
        data: {},
        error: response.data
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

export const updateMember = async (member: Member): Promise<QueriesResponse> => {
  try {
    const response = await axios.patch('http://localhost:3000/api/members', {
      data: {
        ...member
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
        data: {},
        error: response.data
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