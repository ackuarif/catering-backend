/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Keranjang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pelanggan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pemesanan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Keranjang" DROP CONSTRAINT "Keranjang_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "Keranjang" DROP CONSTRAINT "Keranjang_pemesanan_id_fkey";

-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Pemesanan" DROP CONSTRAINT "Pemesanan_pelanggan_id_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Keranjang";

-- DropTable
DROP TABLE "Menu";

-- DropTable
DROP TABLE "Pelanggan";

-- DropTable
DROP TABLE "Pemesanan";

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pelanggan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telepon" INTEGER NOT NULL,
    "alamat" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pelanggan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "diskon" INTEGER NOT NULL,
    "gambar" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pemesanan" (
    "id" SERIAL NOT NULL,
    "pelanggan_id" INTEGER NOT NULL,
    "tgl_pesan" TIMESTAMP(3) NOT NULL,
    "tgl_antar" TIMESTAMP(3) NOT NULL,
    "tgl_bayar" TIMESTAMP(3) NOT NULL,
    "tgl_verif" TIMESTAMP(3) NOT NULL,
    "ket" TEXT NOT NULL,
    "bukti_bayar" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pemesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keranjang" (
    "id" SERIAL NOT NULL,
    "pemesanan_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keranjang_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemesanan" ADD CONSTRAINT "pemesanan_pelanggan_id_fkey" FOREIGN KEY ("pelanggan_id") REFERENCES "pelanggan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_pemesanan_id_fkey" FOREIGN KEY ("pemesanan_id") REFERENCES "pemesanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
