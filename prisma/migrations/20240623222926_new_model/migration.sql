/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `Attendance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "scheduleId";
