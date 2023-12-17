/*
  Warnings:

  - Added the required column `opponentId` to the `Loss` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opponentId` to the `Win` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loss" ADD COLUMN     "opponentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Win" ADD COLUMN     "opponentId" INTEGER NOT NULL;
