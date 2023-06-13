-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pelanggan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "wilayah_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "pelanggan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "diskon" INTEGER NOT NULL,
    "gambar" TEXT,
    "detail" TEXT NOT NULL,
    "tersedia" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pemesanan" (
    "id" SERIAL NOT NULL,
    "pelanggan_id" INTEGER NOT NULL,
    "no_pesan" TEXT NOT NULL,
    "tgl_pesan" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tgl_antar" TIMESTAMP(3),
    "tgl_bayar" TIMESTAMP(3),
    "tgl_verif" TIMESTAMP(3),
    "tgl_selesai" TIMESTAMP(3),
    "ongkir" INTEGER NOT NULL DEFAULT 0,
    "ket" TEXT,
    "bukti_bayar" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pemesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keranjang" (
    "id" SERIAL NOT NULL,
    "pemesanan_id" INTEGER,
    "pelanggan_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "diskon" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keranjang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "pemesanan_id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "user_type" TEXT NOT NULL DEFAULT 'Pelanggan',
    "chat" TEXT NOT NULL,
    "status" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "ip_address" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setting" (
    "id" SERIAL NOT NULL,
    "info_pembayaran" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "komplain" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "nama" TEXT,
    "user_type" TEXT NOT NULL DEFAULT 'Pelanggan',
    "ket" TEXT NOT NULL,
    "status" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "komplain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimoni" (
    "id" SERIAL NOT NULL,
    "pemesanan_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "ket" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimoni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wilayah" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "ongkir" INTEGER DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wilayah_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pelanggan" ADD CONSTRAINT "pelanggan_wilayah_id_fkey" FOREIGN KEY ("wilayah_id") REFERENCES "wilayah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemesanan" ADD CONSTRAINT "pemesanan_pelanggan_id_fkey" FOREIGN KEY ("pelanggan_id") REFERENCES "pelanggan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_pemesanan_id_fkey" FOREIGN KEY ("pemesanan_id") REFERENCES "pemesanan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimoni" ADD CONSTRAINT "testimoni_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
