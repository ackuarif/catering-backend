/*
  Warnings:

  - Added the required column `user_type` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "user_type" TEXT NOT NULL;
