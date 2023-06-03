/*
  Warnings:

  - Added the required column `nama` to the `testimoni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "testimoni" ADD COLUMN     "nama" TEXT NOT NULL;
