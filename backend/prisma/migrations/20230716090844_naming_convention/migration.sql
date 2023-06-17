/*
  Warnings:

  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `forty_two_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `google_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otp_is_enabled` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otp_secret` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_display_name_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "display_name",
DROP COLUMN "forty_two_id",
DROP COLUMN "full_name",
DROP COLUMN "google_id",
DROP COLUMN "otp_is_enabled",
DROP COLUMN "otp_secret",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fortyTwoId" TEXT,
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "otpIsEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otpSecret" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
