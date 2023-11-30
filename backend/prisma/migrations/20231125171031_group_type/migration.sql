-- CreateEnum
CREATE TYPE "groupType" AS ENUM ('PUBLIC', 'PROTECTED', 'PRIVATE');

-- AlterTable
ALTER TABLE "GroupConversation" ADD COLUMN     "password" TEXT,
ADD COLUMN     "type" "groupType" NOT NULL DEFAULT 'PUBLIC';
