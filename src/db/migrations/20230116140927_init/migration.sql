-- DropForeignKey
ALTER TABLE "keranjang" DROP CONSTRAINT "keranjang_pemesanan_id_fkey";

-- AlterTable
ALTER TABLE "keranjang" ALTER COLUMN "pemesanan_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_pemesanan_id_fkey" FOREIGN KEY ("pemesanan_id") REFERENCES "pemesanan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
