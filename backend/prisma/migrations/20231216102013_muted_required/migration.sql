/*
  Warnings:

  - Made the column `mutedUntil` on table `GroupMember` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GroupMember" ALTER COLUMN "mutedUntil" SET NOT NULL,
ALTER COLUMN "mutedUntil" SET DEFAULT CURRENT_TIMESTAMP;
