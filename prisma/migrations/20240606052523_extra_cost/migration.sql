/*
  Warnings:

  - Added the required column `amount` to the `ExtraCost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ExtraCost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExtraCost" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL;
