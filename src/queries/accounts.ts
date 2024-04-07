import axios from 'axios'
import { path } from 'utils/path'
import {
  type Permissions,
  type Account,
  type CreateAccount,
  type UpdateAccount,
  type Member,
  type Instructor
} from 'utils/types'

interface GetAccResponse {
  _: Response
  data: Account[]
}

interface CUAccResponse {
  _: Response
  data: Account
}

interface GetAccMemResponse {
  _: Response
  data: {
    _: Account
    memberAccount: Member[]
  }
}

interface GetAccInsResponse {
  _: Response
  data: {
    _: Account
    instructorAccount: Instructor[]
  }
}

export const getTotalPagesA = async (elems: number): Promise<Response> => {
  return await axios.get(`${path()}/api/accounts?getPages=${elems}`)
}

export const getAccounts = async (
  currentPage: number,
  elems: number,
  filterName?: string,
  filterPerm?: Permissions
): Promise<GetAccResponse> => {
  return await axios.get(
    `${path()}/api/accounts?page=${currentPage}&elems=${elems}&filterName=${filterName}&filterPerm=${filterPerm}`
  )
}

export const createAccount = async (
  data: CreateAccount
): Promise<CUAccResponse> => {
  return await axios.post(`${path()}/api/accounts`, {
    username: data.username,
    password: data.password,
    permissions: data.permissions
  })
}

export const deleteAccount = async (id: number): Promise<CUAccResponse> => {
  return await axios.delete(`${path()}/api/accounts`, {
    data: {
      id
    }
  })
}

export const updateAccount = async (
  data: UpdateAccount
): Promise<CUAccResponse> => {
  return await axios.patch(`${path()}/api/accounts`, data)
}

export const logOutAccount = async (): Promise<Response> => {
  return await axios.post(`${path()}/api/logout`)
}

export const findAccountByUsername = async (
  username: string
): Promise<CUAccResponse> => {
  return await axios.get(`${path()}/api/accounts/${username}`)
}

export const findAccountInstructorsById = async (
  id: number | string
): Promise<GetAccInsResponse> => {
  return await axios.get(`${path()}/api/accounts/instructors/${id}`)
}

export const findAccountMembersById = async (
  id: number | string
): Promise<GetAccMemResponse> => {
  return await axios.get(`${path()}/api/accounts/members/${id}`)
}
