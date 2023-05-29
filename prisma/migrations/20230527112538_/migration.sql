-- CreateTable
CREATE TABLE "komplain" (
    "id" SERIAL NOT NULL,
    "pelanggan_id" INTEGER NOT NULL,
    "ket" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "komplain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimoni" (
    "id" SERIAL NOT NULL,
    "pemesanan_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "ket" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimoni_pkey" PRIMARY KEY ("id")
);
