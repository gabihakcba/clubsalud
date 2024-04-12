/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_accountId_key" ON "Employee"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_accountId_key" ON "Instructor"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_accountId_key" ON "Member"("accountId");
