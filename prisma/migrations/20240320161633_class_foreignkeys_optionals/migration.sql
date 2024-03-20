-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_instructorInCharge_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_instructorSubstitute_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "instructorInCharge" DROP NOT NULL,
ALTER COLUMN "instructorSubstitute" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_instructorInCharge_fkey" FOREIGN KEY ("instructorInCharge") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_instructorSubstitute_fkey" FOREIGN KEY ("instructorSubstitute") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
