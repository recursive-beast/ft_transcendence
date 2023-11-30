/*
  Warnings:

  - You are about to drop the column `isBanned` on the `GroupMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "isBanned";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "groupConversationId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupConversationId_fkey" FOREIGN KEY ("groupConversationId") REFERENCES "GroupConversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
