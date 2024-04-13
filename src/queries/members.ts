import { type CreateMember, type Member } from 'utils/types'
import axios from 'axios'
import { path } from 'utils/path'

interface GetMemResponse {
  _: Response
  data: Member
}

export const getMembers = async (page: number = 0): Promise<Member[]> => {
  const response = await axios.get(`${path()}/api/members?page=${page}`)
  return response.data
}

export const getMemberById = async (id: number): Promise<GetMemResponse> => {
  return await axios.get(`${path()}/api/members/${id}`)
}

export const getTotalPagesM = async (): Promise<GetMemResponse> => {
  return await axios.get(`${path()}/api/members?page=-1`)
}

export const createMember = async (
  newMember: CreateMember
): Promise<Member> => {
  const response = await axios.post(`${path()}/api/members`, {
    ...newMember
  })
  return response.data
}

export const deleteMember = async (id: number): Promise<GetMemResponse> => {
  return await axios.delete(`${path()}/api/members`, {
    data: {
      id
    }
  })
}

export const updateMember = async (member: Member): Promise<Member> => {
  const response = await axios.patch(`${path()}/api/members`, {
    ...member
  })
  return response.data
}
