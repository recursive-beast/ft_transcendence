-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('FRIEND_ADD');

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "type" "NotificationType" NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "recepientId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recepientId_fkey" FOREIGN KEY ("recepientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
