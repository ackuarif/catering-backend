-- CreateTable
CREATE TABLE "info_pembayaran" (
    "id" SERIAL NOT NULL,
    "info" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "info_pembayaran_pkey" PRIMARY KEY ("id")
);
