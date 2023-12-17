/*
  Warnings:

  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "EasygoingRally" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "FirstVictory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "FriendlyMatch" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "PerfectDefense" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "PongNovice" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "RookiePaddler" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "SpeedRacer" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Achievement";
