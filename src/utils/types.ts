export interface QueriesResponse {
  status: number
  data?: any
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

export interface Member extends CreateMember {
  id: number
}

export interface CreateMember {
  name: string
  lastName: string
  dni: bigint
  cuit?: bigint | null
  phoneNumber: bigint
  address: string
  inscriptionDate: Date
  cancelationDate?: Date | null
  cancelationReason?: string | null
  derivedBy: string
  afiliateNumber: bigint
  state: MemberSate
  remainingClasses?: bigint | null
  accountId: number
}

export interface Instructor extends CreateInstructor {
  id: number
}

export interface CreateInstructor {
  name: string
  lastName: string
  dni: bigint
  cuit?: bigint | null
  phoneNumber: bigint
  address: string
  email: string
  degree: string | boolean
  cbu?: bigint | null
  alias?: string | null
  accountId: number
}

export enum Days {
  'MONDAY' = 'MONDAY',
  'TUESDAY' = 'TUESDAY',
  'WEDNESDAY' = 'WEDNESDAY',
  'THURSDAY' = 'THURSDAY',
  'FRIDAY' = 'FRIDAY',
  'SATURDAY' = 'SATURDAY',
  'SUNDAY' = 'SUNDAY'
}

export enum ClassState {
  'ACTIVE' = 'ACTIVE',
  'VACATION' = 'VACATION',
  'CANCELED' = 'CANCELED',
  'OTHER' = 'OTHER'
}

export interface Class extends CreateClass {
  id: number
}

export interface CreateClass {
  name: string
  duration: number
  days: Days[]
  state: ClassState
  instructorInCharge?: number
  instructorSubstitute?: number
}

export type Setter = React.Dispatch<React.SetStateAction<any>>
