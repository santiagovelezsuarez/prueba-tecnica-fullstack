-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('CREDENTIAL', 'GITHUB');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Provider" NOT NULL DEFAULT 'CREDENTIAL';
