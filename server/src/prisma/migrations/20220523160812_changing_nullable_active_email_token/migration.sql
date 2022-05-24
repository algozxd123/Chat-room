/*
  Warnings:

  - Made the column `activateToken` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `activateExpires` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "activateToken" SET NOT NULL,
ALTER COLUMN "activateExpires" SET NOT NULL;
