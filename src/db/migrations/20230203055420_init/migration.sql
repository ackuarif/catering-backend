/*
  Warnings:

  - You are about to drop the column `user_id` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `user_type` on the `chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chat" DROP COLUMN "user_id",
DROP COLUMN "user_type";
