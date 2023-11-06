/*
  Warnings:

  - You are about to drop the `_DirectConversationToMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DirectConversationToMessage" DROP CONSTRAINT "_DirectConversationToMessage_A_fkey";

-- DropForeignKey
ALTER TABLE "_DirectConversationToMessage" DROP CONSTRAINT "_DirectConversationToMessage_B_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "directConversationId" INTEGER;

-- DropTable
DROP TABLE "_DirectConversationToMessage";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_directConversationId_fkey" FOREIGN KEY ("directConversationId") REFERENCES "DirectConversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
