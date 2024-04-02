/*
  Warnings:

  - You are about to alter the column `amountWeeklyClasses` on the `Promotion` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Promotion" ALTER COLUMN "amountWeeklyClasses" SET DATA TYPE INTEGER;
