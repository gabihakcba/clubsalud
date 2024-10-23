-- DropForeignKey
ALTER TABLE "HealthPlanRecord" DROP CONSTRAINT "HealthPlanRecord_healthPlanId_fkey";

-- AddForeignKey
ALTER TABLE "HealthPlanRecord" ADD CONSTRAINT "HealthPlanRecord_healthPlanId_fkey" FOREIGN KEY ("healthPlanId") REFERENCES "HealthPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
