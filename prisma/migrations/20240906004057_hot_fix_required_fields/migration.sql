-- AlterTable
ALTER TABLE "RegistrationForm" ALTER COLUMN "fallsPerMonth" DROP NOT NULL,
ALTER COLUMN "oncologicalDiseaseStatus" DROP NOT NULL,
ALTER COLUMN "otherConditions" DROP NOT NULL,
ALTER COLUMN "surgeryDate" DROP NOT NULL,
ALTER COLUMN "surgeryLocation" DROP NOT NULL,
ALTER COLUMN "traumaDate" DROP NOT NULL,
ALTER COLUMN "traumaLocation" DROP NOT NULL;
