-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "menu" ALTER COLUMN "gambar" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pelanggan" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pemesanan" ALTER COLUMN "tgl_bayar" DROP NOT NULL,
ALTER COLUMN "tgl_verif" DROP NOT NULL,
ALTER COLUMN "ket" DROP NOT NULL,
ALTER COLUMN "bukti_bayar" DROP NOT NULL;
