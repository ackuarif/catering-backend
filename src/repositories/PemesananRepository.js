import { PrismaClient } from "@prisma/client";
import { toDate, toDateOnly } from "../libs/datetime";

const prisma = new PrismaClient();

export const getPemesananVerifRepository = async () => {
	try {
		return await prisma.$queryRaw`
			SELECT
                pemesanan.*,
				ROUND(SUM((keranjang.jumlah*keranjang.harga)*((keranjang.diskon/100)+1))) AS total 
			FROM
                pemesanan,
				keranjang
			WHERE
                pemesanan.id = keranjang.pemesanan_id
                AND pemesanan.tgl_verif IS NULL
                AND pemesanan.tgl_bayar IS NOT NULL
            GROUP BY
                pemesanan.id
		`;
	} catch (error) {
		throw error;
	}	
}

export const getPemesananProsesRepository = async () => {
	try {
		return await prisma.$queryRaw`
			SELECT
                pemesanan.*,
				ROUND(SUM((keranjang.jumlah*keranjang.harga)*((keranjang.diskon/100)+1))) AS total 
			FROM
                pemesanan,
				keranjang
			WHERE
                pemesanan.id = keranjang.pemesanan_id
                AND pemesanan.tgl_selesai IS NULL
                AND pemesanan.tgl_verif IS NOT NULL
            GROUP BY
                pemesanan.id
		`;
	} catch (error) {
		throw error;
	}	
}

export const getPemesananSelesaiRepository = async () => {
	try {
		return await prisma.$queryRaw`
			SELECT
                pemesanan.*,
				ROUND(SUM((keranjang.jumlah*keranjang.harga)*((keranjang.diskon/100)+1))) AS total 
			FROM
                pemesanan,
				keranjang
			WHERE
                pemesanan.id = keranjang.pemesanan_id
                AND pemesanan.tgl_selesai IS NOT NULL
            GROUP BY
                pemesanan.id
		`;
	} catch (error) {
		throw error;
	}	
}

export const laporanPendapatanByDateRepository = async (req) => {
    let {
        tgl_dari,
        tgl_sampai,
    } = req;

    if (!tgl_dari
        || !tgl_sampai
    ){
        throw "Maaf, parameter tidak lengkap.";
    }

	try {
		return await prisma.$queryRaw`
			SELECT
                pemesanan.*,
				ROUND(SUM((keranjang.jumlah*keranjang.harga)*((keranjang.diskon/100)+1))) AS total 
			FROM
                pemesanan,
				keranjang
			WHERE
                pemesanan.id = keranjang.pemesanan_id
                AND tgl_verif IS NOT NULL
                AND pemesanan.tgl_bayar::DATE BETWEEN ${tgl_dari}::DATE AND ${tgl_sampai}::DATE
            GROUP BY
                pemesanan.id
		`;
	} catch (error) {
		throw error;
	}	
}

export const getJmlPemesananTodayRepository = async () => {
	try {
		return await prisma.$queryRaw`
			SELECT
                COUNT(id) jml
			FROM
                pemesanan
			WHERE
                created_at::DATE = NOW()::DATE
            GROUP BY
                pemesanan.id
		`;
	} catch (error) {
		throw error;
	}	
}