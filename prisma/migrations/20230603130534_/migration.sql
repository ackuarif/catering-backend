/*
  Warnings:

  - You are about to alter the column `telepon` on the `pelanggan` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "pelanggan" ALTER COLUMN "telepon" SET DATA TYPE INTEGER;
