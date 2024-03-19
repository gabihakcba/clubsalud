-- AlterEnum
ALTER TYPE "JobPosition" ADD VALUE 'RECEPTIONIST';

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "accountId" INTEGER;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
