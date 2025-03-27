/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Notes` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_employeeId_fkey";

-- AlterTable
ALTER TABLE "Notes" DROP COLUMN "employeeId",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "readed" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
