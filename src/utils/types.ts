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

export interface Class_ extends CreateClass_ {
  id: number
}

export interface CreateClass_ {
  name: string
  duration: number
}

export interface Schedule {
  id: number
  day: Days
  start: number
  end: number
  instructorInCharge?: number
  instructorSubstitute?: number
  classId?: number
}

export interface Promotion extends CreatePromotion {
  id: number
}

export interface CreatePromotion {
  title: string
  description: string
  amountWeeklyClasses: number
  amountPrice: number
  lastPriceUpdate?: Date
}

export interface Subscription extends CreateSubscription {
  id: number
}

export interface CreateSubscription {
  date: Date
  paid: boolean
  remaining: number
  promotionId: number
  memberId: number
}

export type Setter = React.Dispatch<React.SetStateAction<any>>
