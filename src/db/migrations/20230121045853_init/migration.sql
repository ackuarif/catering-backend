/*
  Warnings:

  - Added the required column `pelanggan_id` to the `keranjang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "keranjang" ADD COLUMN     "pelanggan_id" INTEGER NOT NULL;
