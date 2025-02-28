import {
  MemberSate,
  type CreateMember,
  type Member
} from 'utils/ClubSalud/types'
import axios from 'axios'
import { path } from 'utils/ClubSalud/path'

interface GetMemResponse {
  _: Response
  data: Member
}

export const getMembers = async (page: number = 0): Promise<Member[]> => {
  const response = await axios.get(`${path()}/api/members?page=${page}`)
  return response.data
}

export const getActiveMembers = async (page: number = 0): Promise<Member[]> => {
  const response = await axios.get(
    `${path()}/api/members?state=${MemberSate.ACTIVE}`
  )
  return response.data
}

export const getInactiveMembers = async (
  page: number = 0
): Promise<Member[]> => {
  const response = await axios.get(
    `${path()}/api/members?state=${MemberSate.INACTIVE}`
  )
  return response.data
}

export const getMemberById = async (id: number): Promise<Member> => {
  const response = await axios.get(`${path()}/api/members/${id}`)
  return response.data
}

export const getTotalPagesM = async (): Promise<GetMemResponse> => {
  return await axios.get(`${path()}/api/members?page=-1`)
}

export const createMember = async (
  newMember: CreateMember
): Promise<Member> => {
  const response = await axios.post(`${path()}/api/members`, newMember)
  return response.data
}

export const deleteMember = async (id: number): Promise<Member> => {
  const response = await axios.delete(`${path()}/api/members`, {
    data: {
      id
    }
  })
  return response.data
}

export const updateMember = async (member: Member): Promise<Member> => {
  const response = await axios.patch(`${path()}/api/members`, {
    ...member
  })
  return response.data
}

export const updateMembersState = async (): Promise<{
  actives: Member[]
  inactives: Member[]
}> => {
  const response = await axios.get(`${path()}/api/members/actives`)
  return response.data
}
