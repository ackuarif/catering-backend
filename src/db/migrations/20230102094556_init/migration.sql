/*
  Warnings:

  - You are about to drop the column `name` on the `menu` table. All the data in the column will be lost.
  - Added the required column `nama` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu" DROP COLUMN "name",
ADD COLUMN     "nama" TEXT NOT NULL;
