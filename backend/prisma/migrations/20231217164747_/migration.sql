/*
  Warnings:

  - You are about to drop the column `EasygoingRally` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "EasygoingRally",
ADD COLUMN     "PongMaster" BOOLEAN NOT NULL DEFAULT false;
