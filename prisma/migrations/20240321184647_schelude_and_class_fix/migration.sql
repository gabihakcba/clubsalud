/*
  Warnings:

  - You are about to drop the column `days` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `instructorInCharge` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `instructorSubstitute` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Class` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_instructorInCharge_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_instructorSubstitute_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "days",
DROP COLUMN "instructorInCharge",
DROP COLUMN "instructorSubstitute",
DROP COLUMN "state";

-- DropEnum
DROP TYPE "ClassState";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "day" "Days" NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "instructorInCharge" INTEGER,
    "instructorSubstitute" INTEGER,
    "classId" INTEGER,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_instructorInCharge_fkey" FOREIGN KEY ("instructorInCharge") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_instructorSubstitute_fkey" FOREIGN KEY ("instructorSubstitute") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
