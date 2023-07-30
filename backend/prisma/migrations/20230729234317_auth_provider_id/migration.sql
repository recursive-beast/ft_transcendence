/*
  Warnings:

  - You are about to drop the column `fortyTwoId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authProviderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authProviderId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fortyTwoId",
DROP COLUMN "googleId",
ADD COLUMN     "authProviderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_authProviderId_key" ON "User"("authProviderId");
