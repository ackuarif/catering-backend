/*
  Warnings:

  - Made the column `diskon` on table `menu` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "menu" ALTER COLUMN "diskon" SET NOT NULL;
