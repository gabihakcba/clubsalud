export interface QueriesResponse {
  status: number
  data?: any
  error?: object
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

export enum ContractType {
  'PERMANENT' = 'PERMANENT',
  'CASUAL' = 'CASUAL',
  'OTHER' = 'OTHER'
}

export enum JobPosition {
  'CLEANING' = 'CLEANING',
  'MAINTENANCE' = 'MAINTENANCE',
  'RECEPTIONIST' = 'RECEPTIONIST',
  'OTHER' = 'OTHER'
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

export enum HealthPlanType {
  'OSDE' = 'OSDE',
  'PAMI' = 'PAMI',
  'APROSS' = 'APROSS',
  'IPROSS' = 'IPROSS',
  'OTHER' = 'OTHER'
}

export interface Account {
  id: number
  username: string
  password: string
  permissions: Permissions[]
  notificationSender?: Notification[]
  notifiactionReceiver?: Notification[]
  instructorAccount?: Instructor
  memberAccount?: Member
  employeeAccount?: Employee
}

export interface CreateAccount {
  username: string
  password: string
  repeatpassword: string
  permissions: Permissions[]
}

export interface UpdateAccount {
  id: number
  username: string
  password: string
  repeatpassword: string
  permissions: Permissions[]
}

export interface LogIn {
  username: string
  password: string
}

export interface Member extends CreateMember {
  id: number
  memberSubscription?: Subscription[]
  payment?: Payment[]
  planSubscribed?: HealthPlanSubscribed[]
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
  promotion?: Promotion
}

export interface CreateSubscription {
  date: Date
  paid: boolean
  remaining: number
  total: number
  promotionId: number
  memberId: number
}

export interface Payment extends CreatePayment {
  id: number
  member?: Member
  subscription?: Subscription
}

export interface CreatePayment {
  amount: number
  date: Date
  memberId: number
  subscriptionId: number
}

export interface HealthPlanSubscribed extends CreateHealthPlanSubscribed {
  id: number
  member?: Member
  plan?: HealthPlan
}

export interface CreateHealthPlanSubscribed {
  memberId: number
  planId: number
}

export interface HealthPlan extends CreateHealthPlan {
  id: number
  planSubscription?: HealthPlanSubscribed[]
}

export interface CreateHealthPlan {
  name: string
  description?: string
  type: HealthPlanType
  paymentPerConsultation: number
}

export interface Notification extends CreateNotification {
  id: number
  sender: Account
  receiver: Account
}

export interface CreateNotification {
  subject: number
  body: string
  senderId: number
  receiverId: number
}

export interface Employee {
  id: number
  account?: Account
  payment: EmployeePayment[]
}

export interface CreateEmployee {
  name: string
  lastName: string
  dni: bigint
  cuit?: bigint
  phoneNumber: number
  email: string
  position: JobPosition
  contractType: ContractType
  salary: number
  lastSalaryUpdate: Date
  accountId?: number
}

export interface EmployeePayment extends CreateEmployeePayment {
  id: number
}

export interface CreateEmployeePayment {
  hoursWorked: number
  amount: number
  monthPayment: Date
  date: Date
  paid: boolean
  employeeId: number
}

export interface BilledConsultation extends CreateBilledConsultation {
  id: number
  subscription: Subscription
  plan: HealthPlanSubscribed
}

export interface CreateBilledConsultation {
  amount: number
  date: Date
  subscriptionId: number
  healthSubscribedPlanId: number
}

export type Setter = React.Dispatch<React.SetStateAction<any>>
