-- AlterTable
ALTER TABLE "DirectConversation" ADD COLUMN     "isDirect" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isGroup" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "GroupConversation" ADD COLUMN     "isDirect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isGroup" BOOLEAN NOT NULL DEFAULT true;
