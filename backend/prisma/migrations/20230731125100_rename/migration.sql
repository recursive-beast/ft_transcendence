/*
  Warnings:

  - You are about to drop the column `fullname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[displayName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullname",
DROP COLUMN "username",
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_displayName_key" ON "User"("displayName");
