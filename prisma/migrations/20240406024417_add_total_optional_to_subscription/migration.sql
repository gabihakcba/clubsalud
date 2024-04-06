-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_promotionId_fkey";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "total" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
