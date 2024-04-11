-- DropForeignKey
ALTER TABLE "HealthPlanSubscribed" DROP CONSTRAINT "HealthPlanSubscribed_memberId_fkey";

-- DropForeignKey
ALTER TABLE "HealthPlanSubscribed" DROP CONSTRAINT "HealthPlanSubscribed_planId_fkey";

-- AlterTable
ALTER TABLE "HealthPlan" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "HealthPlanSubscribed" ADD CONSTRAINT "HealthPlanSubscribed_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthPlanSubscribed" ADD CONSTRAINT "HealthPlanSubscribed_planId_fkey" FOREIGN KEY ("planId") REFERENCES "HealthPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
