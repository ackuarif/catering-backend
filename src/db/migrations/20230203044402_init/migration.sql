-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "pemesanan_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,
    "chat" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);
