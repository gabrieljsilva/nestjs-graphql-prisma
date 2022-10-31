/*
  Warnings:

  - Added the required column `status` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CredentialsStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'WAITING_CONFIRMATION');

-- AlterTable
ALTER TABLE "credentials" ADD COLUMN     "status" "CredentialsStatus" NOT NULL;

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "type",
ADD COLUMN     "type" "TokenType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TokenStatus" NOT NULL;
