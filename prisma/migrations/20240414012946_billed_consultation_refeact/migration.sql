/*
  Warnings:

  - You are about to drop the column `healthPlanId` on the `BilledConsultation` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `BilledConsultation` table. All the data in the column will be lost.
  - Added the required column `healthSubscribedPlanId` to the `BilledConsultation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BilledConsultation" DROP CONSTRAINT "BilledConsultation_healthPlanId_fkey";

-- DropForeignKey
ALTER TABLE "BilledConsultation" DROP CONSTRAINT "BilledConsultation_memberId_fkey";

-- DropForeignKey
ALTER TABLE "BilledConsultation" DROP CONSTRAINT "BilledConsultation_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "BilledConsultation" DROP COLUMN "healthPlanId",
DROP COLUMN "memberId",
ADD COLUMN     "healthSubscribedPlanId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BilledConsultation" ADD CONSTRAINT "BilledConsultation_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BilledConsultation" ADD CONSTRAINT "BilledConsultation_healthSubscribedPlanId_fkey" FOREIGN KEY ("healthSubscribedPlanId") REFERENCES "HealthPlanSubscribed"("id") ON DELETE CASCADE ON UPDATE CASCADE;
