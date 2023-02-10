/*
  Warnings:

  - Added the required column `no_pesan` to the `pemesanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pemesanan" ADD COLUMN     "no_pesan" TEXT NOT NULL;
