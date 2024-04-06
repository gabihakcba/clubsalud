/*
  Warnings:

  - Made the column `total` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "total" SET NOT NULL;
