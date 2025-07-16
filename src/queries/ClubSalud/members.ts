import {
  type CreateAccount,
  type CreateMember,
  type Member
} from 'utils/ClubSalud/types'
import { apiClubSalud } from 'utils/axios.service'

export const getMembers = async (): Promise<Member[]> => {
  const response = await apiClubSalud.get('/member')
  return response.data
}

export const getMemberById = async (id: number): Promise<Member> => {
  const response = await apiClubSalud.get(`/member/${id}`)
  return response.data
}

export const createMember = async (data: {
  account: CreateAccount
  member: CreateMember
  healthPlanSubscribed?: {
    afiliateNumber: string
    planId: number
  }
}): Promise<Member> => {
  const response = await apiClubSalud.post('/member', data)
  return response.data
}

export const deleteMember = async (id: number): Promise<Member> => {
  const response = await apiClubSalud.delete(`/member/${id}`)
  return response.data
}

export const updateMember = async (member: Member): Promise<Member> => {
  const { id, ...data } = member
  const response = await apiClubSalud.patch(`/member/${id}`, data)
  return response.data
}

export const updateMembersState = async (): Promise<{
  actives: Member[]
  inactives: Member[]
}> => {
  const response = await apiClubSalud.get('/member/actives')
  return response.data
}
