/*
  Warnings:

  - You are about to drop the column `isMuted` on the `GroupMember` table. All the data in the column will be lost.
  - You are about to drop the column `mutedAt` on the `GroupMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "isMuted",
DROP COLUMN "mutedAt",
ADD COLUMN     "mutedUntil" TIMESTAMP(3),
ALTER COLUMN "isBanned" SET DEFAULT false;
