-- AlterTable
ALTER TABLE "GroupMember" ADD COLUMN     "seenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
