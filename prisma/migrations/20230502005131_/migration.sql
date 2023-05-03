/*
  Warnings:

  - You are about to drop the `info_pembayaran` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "info_pembayaran";

-- CreateTable
CREATE TABLE "setting" (
    "id" SERIAL NOT NULL,
    "info_pembayaran" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);
