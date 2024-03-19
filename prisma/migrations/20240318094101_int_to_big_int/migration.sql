-- CreateEnum
CREATE TYPE "AccountPermissions" AS ENUM ('OWN', 'ADM', 'INS', 'MEM', 'OTHER');

-- CreateEnum
CREATE TYPE "MemberState" AS ENUM ('ACTIVE', 'INACTIVE', 'OTHER');

-- CreateEnum
CREATE TYPE "ClassState" AS ENUM ('ACTIVE', 'VACATION', 'CANCELED', 'OTHER');

-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "JobPosition" AS ENUM ('CLEANING', 'MAINTENANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('PERMANENT', 'CASUAL', 'OTHER');

-- CreateEnum
CREATE TYPE "HealthPlanType" AS ENUM ('OSDE', 'PAMI', 'APROSS', 'IPROSS', 'OTHER');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "permissions" "AccountPermissions" NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dni" BIGINT NOT NULL,
    "cuit" BIGINT,
    "phoneNumber" BIGINT NOT NULL,
    "licenseNumber1" BIGINT NOT NULL,
    "licenseNumber2" BIGINT,
    "email" TEXT NOT NULL,
    "isExternal" BOOLEAN NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dni" BIGINT NOT NULL,
    "cuit" BIGINT,
    "phoneNumber" BIGINT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "degree" BOOLEAN NOT NULL,
    "cbu" BIGINT,
    "alias" TEXT,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dni" BIGINT NOT NULL,
    "cuit" BIGINT,
    "phoneNumber" BIGINT NOT NULL,
    "address" TEXT NOT NULL,
    "inscriptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelationDate" TIMESTAMP(3),
    "cancelationReason" TEXT,
    "derivedBy" TEXT NOT NULL,
    "afiliateNumber" BIGINT NOT NULL,
    "state" "MemberState" NOT NULL,
    "remainingClasses" BIGINT,
    "accountId" INTEGER NOT NULL,
    "medicalRecordId" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructorPayment" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "scheduledHours" DOUBLE PRECISION NOT NULL,
    "workedHours" DOUBLE PRECISION NOT NULL,
    "workedMount" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentState" BOOLEAN NOT NULL DEFAULT false,
    "pricePerHoour" DOUBLE PRECISION NOT NULL,
    "instructorId" INTEGER NOT NULL,

    CONSTRAINT "InstructorPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpenClass" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "given" BOOLEAN NOT NULL DEFAULT false,
    "instructorId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "OpenClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "classId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "days" "Days"[],
    "state" "ClassState" NOT NULL,
    "instructorInCharge" INTEGER NOT NULL,
    "instructorSubstitute" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "openClassId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BilledConsultation" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "healthPlanId" INTEGER NOT NULL,

    CONSTRAINT "BilledConsultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memeberId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Derivation" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diagnosis" TEXT NOT NULL,
    "guidance" TEXT NOT NULL,
    "memberId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "Derivation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dni" BIGINT NOT NULL,
    "cuit" BIGINT,
    "phoneNumber" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "position" "JobPosition" NOT NULL,
    "contractType" "ContractType" NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "lastSalaryUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeePayment" (
    "id" SERIAL NOT NULL,
    "hoursWorked" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "monthPayment" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "EmployeePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthPlanSubscribed" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,

    CONSTRAINT "HealthPlanSubscribed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthPlan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "HealthPlanType",
    "paymentPerConsultation" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HealthPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" SERIAL NOT NULL,
    "medinttCode" BIGINT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid" BOOLEAN NOT NULL,
    "remaining" DOUBLE PRECISION NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amountWeeklyClasses" BIGINT NOT NULL,
    "amountPrice" DOUBLE PRECISION NOT NULL,
    "lastPriceUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructorPrice" (
    "id" SERIAL NOT NULL,
    "degree" BOOLEAN NOT NULL,
    "amount" BIGINT NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstructorPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraCost" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "ExtraCost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrationForm" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "RegistrationForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUpForm" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "FollowUpForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Member_medicalRecordId_key" ON "Member"("medicalRecordId");

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorPayment" ADD CONSTRAINT "InstructorPayment_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenClass" ADD CONSTRAINT "OpenClass_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenClass" ADD CONSTRAINT "OpenClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "OpenClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_instructorInCharge_fkey" FOREIGN KEY ("instructorInCharge") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_instructorSubstitute_fkey" FOREIGN KEY ("instructorSubstitute") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_openClassId_fkey" FOREIGN KEY ("openClassId") REFERENCES "OpenClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BilledConsultation" ADD CONSTRAINT "BilledConsultation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BilledConsultation" ADD CONSTRAINT "BilledConsultation_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BilledConsultation" ADD CONSTRAINT "BilledConsultation_healthPlanId_fkey" FOREIGN KEY ("healthPlanId") REFERENCES "HealthPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_memeberId_fkey" FOREIGN KEY ("memeberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Derivation" ADD CONSTRAINT "Derivation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Derivation" ADD CONSTRAINT "Derivation_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeePayment" ADD CONSTRAINT "EmployeePayment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthPlanSubscribed" ADD CONSTRAINT "HealthPlanSubscribed_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthPlanSubscribed" ADD CONSTRAINT "HealthPlanSubscribed_planId_fkey" FOREIGN KEY ("planId") REFERENCES "HealthPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
