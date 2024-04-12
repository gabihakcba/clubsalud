import axios from 'axios'
import { path } from 'utils/path'
import {
  type Permissions,
  type Account,
  type CreateAccount,
  type UpdateAccount,
  type Instructor
} from 'utils/types'

interface GetAccInsResponse {
  _: Response
  data: {
    _: Account
    instructorAccount: Instructor[]
  }
}

interface getAccountsType {
  pages: Account[]
  totalPages: number
  perPage: number
  nextPage: number
  currentPage: number
}

export const getTotalPagesA = async (elems: number): Promise<Response> => {
  return await axios.get(`${path()}/api/accounts?getPages=${elems}`)
}

export const getAccounts = async (
  currentPage: number,
  elems: number,
  filterName?: string,
  filterPerm?: Permissions
): Promise<getAccountsType> => {
  const response = await axios.get(
    `${path()}/api/accounts?page=${currentPage}&elems=${elems}&filterName=${filterName}&filterPerm=${filterPerm}`
  )
  return response.data
}

export const createAccount = async (data: CreateAccount): Promise<Account> => {
  const response = await axios.post(`${path()}/api/accounts`, {
    username: data.username,
    password: data.password,
    permissions: data.permissions
  })
  return response.data
}

export const deleteAccount = async (id: number): Promise<Account> => {
  const response = await axios.delete(`${path()}/api/accounts`, {
    data: {
      id
    }
  })
  return response.data
}

export const updateAccount = async (data: UpdateAccount): Promise<Account> => {
  const response = await axios.patch(`${path()}/api/accounts`, data)
  return response.data
}

export const logOutAccount = async (): Promise<Response> => {
  return await axios.post(`${path()}/api/logout`)
}

export const findAccountByUsername = async (
  username: string
): Promise<Account> => {
  const response = await axios.get(`${path()}/api/accounts/${username}`)
  return response.data
}

export const findAccountInstructorsById = async (
  id: number | string
): Promise<GetAccInsResponse> => {
  return await axios.get(`${path()}/api/accounts/instructors/${id}`)
}

export const findAccountMembersById = async (
  id: number | string
): Promise<Account> => {
  const response = await axios.get(`${path()}/api/accounts/members/${id}`)
  return response.data
}

export const getAccountById = async (id: string): Promise<Account> => {
  const response = await axios.get(`${path()}/api/account/${id}`)
  return response.data
}
