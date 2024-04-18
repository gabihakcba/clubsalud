/*
  Warnings:

  - You are about to drop the column `paid` on the `EmployeePayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmployeePayment" DROP COLUMN "paid",
ALTER COLUMN "hoursWorked" DROP NOT NULL;
