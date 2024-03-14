-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_accountId_fkey";

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
