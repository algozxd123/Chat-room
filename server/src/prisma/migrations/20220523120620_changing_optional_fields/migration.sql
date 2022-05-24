/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "activateToken" DROP NOT NULL,
ALTER COLUMN "passwordResetToken" DROP NOT NULL,
ALTER COLUMN "activateExpires" DROP NOT NULL,
ALTER COLUMN "passwordResetExpires" DROP NOT NULL;
