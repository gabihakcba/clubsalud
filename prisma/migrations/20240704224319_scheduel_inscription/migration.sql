/*
  Warnings:

  - You are about to drop the `OpenClass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OpenClass" DROP CONSTRAINT "OpenClass_classId_fkey";

-- DropForeignKey
ALTER TABLE "OpenClass" DROP CONSTRAINT "OpenClass_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_openClassId_fkey";

-- DropTable
DROP TABLE "OpenClass";

-- DropTable
DROP TABLE "Reservation";

-- CreateTable
CREATE TABLE "ScheduleInscription" (
    "id" SERIAL NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "ScheduleInscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScheduleInscription" ADD CONSTRAINT "ScheduleInscription_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleInscription" ADD CONSTRAINT "ScheduleInscription_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
