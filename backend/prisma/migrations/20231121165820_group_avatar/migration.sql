/*
  Warnings:

  - You are about to drop the column `groupConversationId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_groupConversationId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_groupConversationId_fkey";

-- AlterTable
ALTER TABLE "GroupConversation" ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "groupConversationId";

-- CreateTable
CREATE TABLE "_GroupConversationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupConversationToUser_AB_unique" ON "_GroupConversationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupConversationToUser_B_index" ON "_GroupConversationToUser"("B");

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupConversationId_fkey" FOREIGN KEY ("groupConversationId") REFERENCES "GroupConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupConversationToUser" ADD CONSTRAINT "_GroupConversationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupConversationToUser" ADD CONSTRAINT "_GroupConversationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
