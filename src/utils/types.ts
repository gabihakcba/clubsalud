export interface QueriesResponse {
  status: number
  data: any
  error?: object
}

export enum Permissions {
  'OWN' = 'OWN',
  'ADM' = 'ADM',
  'INS' = 'INS',
  'MEM' = 'MEM',
  'OTHER' = 'OTHER'
}

export enum MemberSate {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
  'OTHER' = 'OTHER'
}

export interface Account {
  id: number
  username: string
  password: string
  permissions: Permissions
}

export interface CreateAccount {
  username: string
  password: string
  repeatpassword: string
  permissions: Permissions
}

export interface UpdateAccount {
  id: number
  username: string
  password: string
  repeatpassword: string
  permissions: Permissions
}

export interface LogIn {
  username: string
  password: string
}

export interface Limits {
  start: number
  end: number
}

export interface Member extends CreateMember {
  id: number
}

export interface CreateMember {
  name: string
  lastName: string
  dni: number
  cuit?: number
  phoneNumber: number
  address: string
  inscriptionDate: Date
  cancelationDate?: Date
  cancelationReason?: string
  derivedBy: string
  afiliateNumber: number
  state: MemberSate
  remainingClasses?: number
  accountId: number
}

export type Setter = React.Dispatch<React.SetStateAction<any>>
