/*
  Warnings:

  - You are about to drop the column `conversationId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_banned` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "_banned" DROP CONSTRAINT "_banned_A_fkey";

-- DropForeignKey
ALTER TABLE "_banned" DROP CONSTRAINT "_banned_B_fkey";

-- DropForeignKey
ALTER TABLE "_member" DROP CONSTRAINT "_member_A_fkey";

-- DropForeignKey
ALTER TABLE "_member" DROP CONSTRAINT "_member_B_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "conversationId";

-- DropTable
DROP TABLE "Conversation";

-- DropTable
DROP TABLE "_banned";

-- DropTable
DROP TABLE "_member";

-- CreateTable
CREATE TABLE "DirectConversation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DirectConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DirectConversationToMessage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DirectConversationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DirectConversationToMessage_AB_unique" ON "_DirectConversationToMessage"("A", "B");

-- CreateIndex
CREATE INDEX "_DirectConversationToMessage_B_index" ON "_DirectConversationToMessage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DirectConversationToUser_AB_unique" ON "_DirectConversationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DirectConversationToUser_B_index" ON "_DirectConversationToUser"("B");

-- AddForeignKey
ALTER TABLE "_DirectConversationToMessage" ADD CONSTRAINT "_DirectConversationToMessage_A_fkey" FOREIGN KEY ("A") REFERENCES "DirectConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DirectConversationToMessage" ADD CONSTRAINT "_DirectConversationToMessage_B_fkey" FOREIGN KEY ("B") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DirectConversationToUser" ADD CONSTRAINT "_DirectConversationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "DirectConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DirectConversationToUser" ADD CONSTRAINT "_DirectConversationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
