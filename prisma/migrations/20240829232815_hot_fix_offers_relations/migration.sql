/*
  Warnings:

  - You are about to drop the column `planId` on the `Promotion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_planId_fkey";

-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "planId";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "planId" INTEGER;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
