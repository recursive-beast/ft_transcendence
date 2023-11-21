/*
  Warnings:

  - Made the column `avatar` on table `GroupConversation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GroupConversation" ALTER COLUMN "avatar" SET NOT NULL;
