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

export enum OncologicalDiseaseStatus {
  'RESOLVED' = 'RESOLVED',
  'ACTIVE' = 'ACTIVE'
}

export interface Account {
  id: number
  username: string
  permissions: Permissions[]
  password?: string
  Sender?: Notification[]
  Receiver?: Notification[]
  Instructor?: Instructor
  Member?: Member
  Employee?: Employee
}

export interface CreateAccount {
  username: string
  password: string
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
  scheduleInscription?: ScheduleInscription[]
  Subscription?: Subscription[]
  Payment?: Payment[]
  Attendance?: Attendance[]
  RegistrationForm?: RegistrationForm
  FollowUpForm?: FollowUpForm[]
  accountId?: number
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
  HealthPlanSubscribed?: HealthPlanSubscribed[]
  birthday: Date
}

export interface InstructorPayment extends CreateInstructorPayment {
  id: number
  Instructor?: Instructor
}

export interface CreateInstructorPayment {
  amount: number
  scheduledHours?: number
  workedHours: number
  workedMonth: Date
  paymentDate: Date
  pricePerHoour?: number
  instructorId: number
}

export interface Instructor extends CreateInstructor {
  id: number
  instructorPayment?: InstructorPayment[]
  ScheduleInCharge?: Schedule[]
  ScheduleSubstitute?: Schedule[]
  AttendanceInstructor?: AttendanceInstructor[]
}

export interface CreateInstructor {
  name: string
  lastName: string
  dni: bigint
  cuit?: bigint | null
  phoneNumber: bigint
  address: string
  email: string
  degree: boolean
  cbu?: string | null
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
  InstructorInCharge?: Instructor
  Class?: Class_
  attendance?: Attendance
  ScheduleInscription?: ScheduleInscription[]
}

export interface Promotion extends CreatePromotion {
  id: number
  PromotionRecord?: PromotionRecord[]
}

export interface CreatePromotion {
  title: string
  description: string
  amountWeeklyClasses: number
  amountPrice: number
  lastPriceUpdate?: Date
}

export interface PromotionRecord {
  id: number
  date: Date
  price: number
  promotionId: number
  promotion: Promotion
}

export interface Plan extends CreatePlan {
  id: number
  subscription?: Subscription[]
}

export interface CreatePlan {
  title: string
  description: string
  durationMonth: number
  discountPercent: number
}

export interface Subscription extends CreateSubscription {
  id: number
  Promotion?: Promotion
  Plan: Plan
  Payment?: Payment[]
  BilledConsultation?: BilledConsultation[]
  Member: Member
}

export interface CreateSubscription {
  date: Date
  paid: boolean
  remaining: number
  total: number
  initialDate: Date
  expirationDate?: Date
  remainingClasses: number
  active: boolean
  promotionId: number
  memberId: number
  planId: number
  isByOS: boolean
}

export interface Payment extends CreatePayment {
  id: number
  Member?: Member
  Subscription?: Subscription
}

export interface CreatePayment {
  amount: number
  date: Date
  memberId: number
  subscriptionId: number
  isCash: boolean
}

export interface HealthPlanSubscribed extends CreateHealthPlanSubscribed {
  id: number
  Member?: Member
  HealthPlan?: HealthPlan
}

export interface CreateHealthPlanSubscribed {
  memberId: number
  planId: number
  afiliateNumber: string
}

export interface HealthPlan extends CreateHealthPlan {
  id: number
  HealthPlanSubscribed?: HealthPlanSubscribed[]
  HealthPlanRecord?: HealthPlanRecord[]
}

export interface CreateHealthPlan {
  name: string
  description?: string
  type: HealthPlanType
  paymentPerConsultation: number
}

export interface HealthPlanRecord {
  id: number
  date: Date
  amount: number
  healthPlanId: number
  healthPlan: HealthPlan
}

export interface Notification extends CreateNotification {
  id: number
  Sender: Account
  Receiver: Account
}

export interface CreateNotification {
  subject: number
  body: string
  senderId: number
  receiverId: number
}

export interface Employee extends CreateEmployee {
  id: number
  account?: Account
  payment?: EmployeePayment[]
  lastSalaryUpdate?: Date
}

export interface CreateEmployee {
  name: string
  lastName: string
  dni: bigint
  cuit?: bigint
  phoneNumber: bigint
  email: string
  position: JobPosition
  contractType: ContractType
  salary: number
  cbu?: string
  alias?: string
  accountId?: number
}

export interface EmployeePayment extends CreateEmployeePayment {
  id: number
  Employee?: Employee
}

export interface CreateEmployeePayment {
  hoursWorked?: number
  amount: number
  monthPayment: Date
  date: Date
  employeeId: number
}

export interface BilledConsultation extends CreateBilledConsultation {
  id: number
  Subscription: Subscription
  HealthPlanSubscribed: HealthPlanSubscribed
}

export interface CreateBilledConsultation {
  amount: number
  date: Date
  subscriptionId: number
  autorizationNumber: string
  HealthSubscribedPlanId: number
}

export interface InstructorPrice extends CreateInstructorPrice {
  id: number
}

export interface CreateInstructorPrice {
  degree: boolean
  amount: number
  active: number
  lastUpdate?: Date
}

export interface ExtraCost extends CreateExtraCost {
  id: number
}

export interface CreateExtraCost {
  amount: number
  date: Date
  description: string
}

export interface OpenClass extends CreateOpenClass {
  id: number
}

export interface CreateOpenClass {
  date: Date
  given: boolean
  instructorId: number
  classId: number
}

export interface AttendanceInstructor extends CreateAttendanceInstructor {
  id: number
  class?: Class_
  instructor?: Instructor
}

export interface CreateAttendanceInstructor {
  date: Date
  hours: number
  classId: number
  instructorId: number
}

export interface Attendance extends CreateAttendance {
  id: number
}

export interface CreateAttendance {
  date: Date
  classId: number
  memberId: number
  Member?: Member
  Class?: Class_
}

export interface ScheduleInscription extends CreateScheduleInscription {
  id: number
  schedule: Schedule
  member: Member
}

export interface CreateScheduleInscription {
  scheduleId: number
  memberId: number
}

export interface RegistrationForm extends CreateRegistrationForm {
  id: number
  member?: Member
  instructor?: Instructor
  evaluationNumber: number
}

export interface CreateRegistrationForm {
  evaluationDate: Date
  hasHypertension: boolean
  hasDiabetes: boolean
  hasHypercholesterolemia: boolean
  hasHypertriglyceridemia: boolean
  hasStableHeartFailure: boolean
  hasStableIschemicHeartDisease: boolean
  hasChronicObstructivePulmonaryDisease: boolean
  hasAsthma: boolean
  hasOncologicalDisease: boolean
  oncologicalDiseaseStatus?: OncologicalDiseaseStatus
  hasChronicKidneyFailure: boolean
  hasObesity: boolean
  hasRecentTrauma: boolean
  traumaLocation?: string
  traumaDate?: Date
  hasRecentSurgery: boolean
  surgeryLocation?: string
  surgeryDate?: Date
  hasSarcopenia: boolean
  isUnderweight: boolean
  hasFallsLastSixMonths: boolean
  fallsPerMonth?: number
  otherConditions?: string
  memberId: number
  instructorId: number
}

export interface FollowUpForm extends CreateFollowUpForm {
  id: number
  member?: Member
  instructor?: Instructor
  sixMinuteWalkTest?: SixMinuteWalkTest
}

export interface CreateFollowUpForm {
  followUpDate: Date
  rombergTest: boolean
  dixonRuffierTest: number
  modifiedBorgScale: number
  memberId: number
  instructorId: number
}

export interface SixMinuteWalkTest extends CreateSixMinuteWalkTest {
  id: number
  followUpForm: FollowUpForm
}

export interface CreateSixMinuteWalkTest {
  initialDyspneaBorgScale: number
  finalDyspneaBorgScale: number
  initialFatigueBorgScale: number
  finalFatigueBorgScale: number
  initialBloodPressure: number
  finalBloodPressure: number
  initialHeartRate: number
  finalHeartRate: number
  followUpFormId: number
}

export interface priceType {
  title: number
  notitle: number
}

export interface reportType {
  title: string

  totalHoursPerWeek: number
  hoursTitlePerWeek: number
  hoursNoTitlePerWeek: number
  amountTitlePerWeek: number
  amountNoTitlePerWeek: number
  amountPerWeek: number

  totalHoursPerMonth: number
  hoursTitlePerMonth: number
  hoursNoTitlePerMonth: number
  amountTitlePerMonth: number
  amountNoTitlePerMonth: number
  amountPerMonth: number
}

export interface dateType {
  month: number
  year: number
}

export interface Notes extends CreateNotes {
  id: number
  readed: boolean
  date: Date
}

export interface CreateNotes {
  accountId: number
  title: string
  body: string
}

export type Setter = React.Dispatch<React.SetStateAction<any>>

export interface CashMovement {
  id: number
  date: number
  isIncome: boolean
  amount: number
  concept: string
  category: CashCategory
  deleted: boolean

  accountId: number
  paymentId?: number
  extraCostId?: number

  Account: Account
  Payment?: Payment
  ExtraCost?: ExtraCost

  CashAudit: CashAudit[]

  createdAt: Date
  updatedAt: Date
}

enum CashCategory {
  SUBSCRIPTION,
  DEPOSIT,
  EXTRA_COST,
  OWNER_WITHDRAWAL,
  OTHER
}

export interface CreateCashAudit {
  realCash: number
  realRemainder: number
  withdrawal: number
  comment?: string
}

export interface CashAudit extends CreateCashAudit {
  id: number
  date: Date
  theoreticalCash: number
  theoreticalRemainder: number

  accountId: number
  movementId?: number
  Account: Account
  Movement?: CashMovement

  createdAt: Date
  updatedAt: Date
}

enum VerbLog {
  POST,
  PATCH,
  UPDATE,
  CREATE,
  DELETE,
  OTHER
}

enum ActionLog {
  ACCOUNT,
  MEMBER,
  INSTRUCTOR,
  ADMIN,
  EMPLOYEE,

  CLASS,
  PROMOTION,
  PLAN,

  HEALTH_PLAN,
  HEALTH_PLAN_SUSCRIBED,

  SUBSCRIPTION,

  MEMBER_ATTENDANCE,
  INSTRUCTOR_ATTENDANCE,

  CASH_MOVEMENT,
  CASH_AUDIT,

  MEMBER_PAYMENT,
  MEMBER_OS_PAYMENT,
  INSTRUCTOR_PAYMENT,
  EMPLOYEE_PAYMENT
}

export interface UserLog {
  id: number
  accountId: number
  verb: VerbLog
  action: ActionLog
  detail?: string
  comment?: string
  createdAt: Date

  Account: Account
}
