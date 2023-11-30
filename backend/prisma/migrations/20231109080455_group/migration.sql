-- CreateEnum
CREATE TYPE "roleType" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "groupConversationId" INTEGER;

-- CreateTable
CREATE TABLE "GroupMember" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "roleType" NOT NULL DEFAULT 'MEMBER',
    "isBanned" BOOLEAN NOT NULL,
    "isMuted" BOOLEAN NOT NULL,
    "mutedAt" TIMESTAMP(3),
    "groupConversationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupConversation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupConversation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupConversation_title_key" ON "GroupConversation"("title");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_groupConversationId_fkey" FOREIGN KEY ("groupConversationId") REFERENCES "GroupConversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupConversationId_fkey" FOREIGN KEY ("groupConversationId") REFERENCES "GroupConversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
