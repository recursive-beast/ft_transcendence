/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `opponentscore` to the `Loss` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userscore` to the `Loss` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opponentscore` to the `Win` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userscore` to the `Win` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Loss" DROP CONSTRAINT "Loss_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Win" DROP CONSTRAINT "Win_gameId_fkey";

-- AlterTable
ALTER TABLE "Loss" ADD COLUMN     "opponentscore" INTEGER NOT NULL,
ADD COLUMN     "userscore" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Win" ADD COLUMN     "opponentscore" INTEGER NOT NULL,
ADD COLUMN     "userscore" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Game";
