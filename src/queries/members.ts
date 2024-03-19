import {
  type CreateMember,
  type Member,
  type QueriesResponse
} from 'utils/types'
import axios from 'axios'

interface GetMemResponse {
  _: Response
  data: Member
}

export const getMembers = async (
  page: number = 0
): Promise<QueriesResponse> => {
  return await axios.get(`http://localhost:3000/api/members?page=${page}`)
}

export const getMemberById = async (id: number): Promise<GetMemResponse> => {
  return await axios.get(`http://localhost:3000/api/members/${id}`)
}

export const getTotalPagesM = async (): Promise<GetMemResponse> => {
  return await axios.get('http://localhost:3000/api/members?page=-1')
}

export const createMember = async (
  newMember: CreateMember
): Promise<GetMemResponse> => {
  return await axios.post('http://localhost:3000/api/members', {
    ...newMember
  })
}

export const deleteMember = async (id: number): Promise<GetMemResponse> => {
  return await axios.delete('http://localhost:3000/api/members', {
    data: {
      id
    }
  })
}

export const updateMember = async (member: Member): Promise<GetMemResponse> => {
  return await axios.patch('http://localhost:3000/api/members', {
    ...member
  })
}
