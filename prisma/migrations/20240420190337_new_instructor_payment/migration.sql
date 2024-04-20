/*
  Warnings:

  - You are about to drop the column `paymentState` on the `InstructorPayment` table. All the data in the column will be lost.
  - You are about to drop the column `workedMount` on the `InstructorPayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InstructorPayment" DROP COLUMN "paymentState",
DROP COLUMN "workedMount",
ADD COLUMN     "workedMonth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
