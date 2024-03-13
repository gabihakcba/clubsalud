import { RefObject } from "react"

export interface QueriesResponse {
  status: number,
  data: any,
  error?: object
}

export enum Permissions  {
  'OWN' = 'OWN',
  'ADM' = 'ADM',
  'INS' = 'INS',
  'MEM' = 'MEM',
  'OTHER'= 'OTHER'
}

export interface Account {
  id: number,
  username: string,
  password: string,
  permissions: Permissions
}

export interface CreateAccount {
  username: string,
  password: string,
  repeatpassword: string
  permissions: Permissions
}

export interface UpdateAccount {
  id: number,
  username: string,
  password: string,
  repeatpassword: string
  permissions: Permissions
}

export interface LogIn {
  username: string,
  password: string
}

export interface Limits {
  start: number,
  end: number
}