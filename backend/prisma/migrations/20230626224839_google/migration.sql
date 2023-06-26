/*
  Warnings:

  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `usual_full_name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[display_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `display_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "login",
DROP COLUMN "usual_full_name",
ADD COLUMN     "display_name" TEXT NOT NULL,
ADD COLUMN     "forty_two_id" TEXT,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "google_id" TEXT,
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq'),
ALTER COLUMN "image" DROP NOT NULL;
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- CreateIndex
CREATE UNIQUE INDEX "User_display_name_key" ON "User"("display_name");
