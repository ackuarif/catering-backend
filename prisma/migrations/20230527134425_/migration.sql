/*
  Warnings:

  - You are about to drop the column `pelanggan_id` on the `komplain` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "komplain" DROP COLUMN "pelanggan_id",
ADD COLUMN     "nama" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "user_id" INTEGER,
ADD COLUMN     "user_type" TEXT NOT NULL DEFAULT 'Pelanggan';
