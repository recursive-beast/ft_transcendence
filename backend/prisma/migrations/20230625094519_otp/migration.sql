-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp_is_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otp_secret" TEXT;
