-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_medicalRecordId_fkey";

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "medicalRecordId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
