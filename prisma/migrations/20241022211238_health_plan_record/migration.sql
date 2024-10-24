-- CreateTable
CREATE TABLE "HealthPlanRecord" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "healthPlanId" INTEGER NOT NULL,

    CONSTRAINT "HealthPlanRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HealthPlanRecord" ADD CONSTRAINT "HealthPlanRecord_healthPlanId_fkey" FOREIGN KEY ("healthPlanId") REFERENCES "HealthPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
