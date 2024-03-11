/*
  Warnings:

  - Changed the type of `permissions` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AccountPermissions" AS ENUM ('OWN', 'ADM', 'INS', 'MEM', 'OTHER');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "permissions",
ADD COLUMN     "permissions" "AccountPermissions" NOT NULL;

-- DropEnum
DROP TYPE "AccounPermissions";
