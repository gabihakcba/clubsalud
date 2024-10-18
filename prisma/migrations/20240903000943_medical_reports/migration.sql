/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `RegistrationForm` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dixonRuffierTest` to the `FollowUpForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followUpDate` to the `FollowUpForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorId` to the `FollowUpForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `FollowUpForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedBorgScale` to the `FollowUpForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rombergTest` to the `FollowUpForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluationDate` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fallsPerMonth` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasAsthma` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasChronicKidneyFailure` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasChronicObstructivePulmonaryDisease` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasDiabetes` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasFallsLastSixMonths` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasHypercholesterolemia` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasHypertension` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasHypertriglyceridemia` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasObesity` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasOncologicalDisease` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasRecentSurgery` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasRecentTrauma` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasSarcopenia` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasStableHeartFailure` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasStableIschemicHeartDisease` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorId` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isUnderweight` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oncologicalDiseaseStatus` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherConditions` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surgeryDate` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surgeryLocation` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traumaDate` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traumaLocation` to the `RegistrationForm` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OncologicalDiseaseStatus" AS ENUM ('RESOLVED', 'ACTIVE');

-- AlterTable
ALTER TABLE "FollowUpForm" ADD COLUMN     "dixonRuffierTest" INTEGER NOT NULL,
ADD COLUMN     "followUpDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "instructorId" INTEGER NOT NULL,
ADD COLUMN     "memberId" INTEGER NOT NULL,
ADD COLUMN     "modifiedBorgScale" INTEGER NOT NULL,
ADD COLUMN     "rombergTest" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "RegistrationForm" ADD COLUMN     "evaluationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "evaluationNumber" SERIAL NOT NULL,
ADD COLUMN     "fallsPerMonth" INTEGER NOT NULL,
ADD COLUMN     "hasAsthma" BOOLEAN NOT NULL,
ADD COLUMN     "hasChronicKidneyFailure" BOOLEAN NOT NULL,
ADD COLUMN     "hasChronicObstructivePulmonaryDisease" BOOLEAN NOT NULL,
ADD COLUMN     "hasDiabetes" BOOLEAN NOT NULL,
ADD COLUMN     "hasFallsLastSixMonths" BOOLEAN NOT NULL,
ADD COLUMN     "hasHypercholesterolemia" BOOLEAN NOT NULL,
ADD COLUMN     "hasHypertension" BOOLEAN NOT NULL,
ADD COLUMN     "hasHypertriglyceridemia" BOOLEAN NOT NULL,
ADD COLUMN     "hasObesity" BOOLEAN NOT NULL,
ADD COLUMN     "hasOncologicalDisease" BOOLEAN NOT NULL,
ADD COLUMN     "hasRecentSurgery" BOOLEAN NOT NULL,
ADD COLUMN     "hasRecentTrauma" BOOLEAN NOT NULL,
ADD COLUMN     "hasSarcopenia" BOOLEAN NOT NULL,
ADD COLUMN     "hasStableHeartFailure" BOOLEAN NOT NULL,
ADD COLUMN     "hasStableIschemicHeartDisease" BOOLEAN NOT NULL,
ADD COLUMN     "instructorId" INTEGER NOT NULL,
ADD COLUMN     "isUnderweight" BOOLEAN NOT NULL,
ADD COLUMN     "memberId" INTEGER NOT NULL,
ADD COLUMN     "oncologicalDiseaseStatus" "OncologicalDiseaseStatus" NOT NULL,
ADD COLUMN     "otherConditions" TEXT NOT NULL,
ADD COLUMN     "surgeryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "surgeryLocation" TEXT NOT NULL,
ADD COLUMN     "traumaDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "traumaLocation" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SixMinuteWalkTest" (
    "id" SERIAL NOT NULL,
    "initialDyspneaBorgScale" INTEGER NOT NULL,
    "finalDyspneaBorgScale" INTEGER NOT NULL,
    "initialFatigueBorgScale" INTEGER NOT NULL,
    "finalFatigueBorgScale" INTEGER NOT NULL,
    "initialBloodPressure" INTEGER NOT NULL,
    "finalBloodPressure" INTEGER NOT NULL,
    "initialHeartRate" INTEGER NOT NULL,
    "finalHeartRate" INTEGER NOT NULL,
    "followUpFormId" INTEGER NOT NULL,

    CONSTRAINT "SixMinuteWalkTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SixMinuteWalkTest_followUpFormId_key" ON "SixMinuteWalkTest"("followUpFormId");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationForm_memberId_key" ON "RegistrationForm"("memberId");

-- AddForeignKey
ALTER TABLE "RegistrationForm" ADD CONSTRAINT "RegistrationForm_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationForm" ADD CONSTRAINT "RegistrationForm_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpForm" ADD CONSTRAINT "FollowUpForm_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpForm" ADD CONSTRAINT "FollowUpForm_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SixMinuteWalkTest" ADD CONSTRAINT "SixMinuteWalkTest_followUpFormId_fkey" FOREIGN KEY ("followUpFormId") REFERENCES "FollowUpForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
