/*
  Warnings:

  - Changed the type of `activateExpires` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `passwordResetExpires` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activateExpires",
ADD COLUMN     "activateExpires" TIMESTAMP(3) NOT NULL,
DROP COLUMN "passwordResetExpires",
ADD COLUMN     "passwordResetExpires" TIMESTAMP(3) NOT NULL;
