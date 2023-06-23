-- AlterTable
ALTER TABLE "pemesanan" ADD COLUMN     "sistem_bayar" TEXT;

-- CreateTable
CREATE TABLE "menu_isi" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "isi" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_isi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_gambar" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "gambar" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_gambar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menu_isi" ADD CONSTRAINT "menu_isi_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_gambar" ADD CONSTRAINT "menu_gambar_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
