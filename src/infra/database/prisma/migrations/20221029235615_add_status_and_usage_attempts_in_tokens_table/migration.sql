/*
  Warnings:

  - Added the required column `status` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "usageAttempts" INTEGER NOT NULL DEFAULT 0;
