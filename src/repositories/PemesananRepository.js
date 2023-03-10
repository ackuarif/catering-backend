import { PrismaClient } from "@prisma/client";
import { toDate, toDateOnly } from "../libs/datetime";

const prisma = new PrismaClient();

export const getPemesananVerifRepository = async () => {
	try {
		return await prisma.$queryRaw`
			SELECT
                pemesanan.*,
				ROUND(SUM((jumlah*harga)-((jumlah*harga)*(diskon::NUMERIC/100)))) AS total 
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
				ROUND(SUM((jumlah*harga)-((jumlah*harga)*(diskon::NUMERIC/100)))) AS total 
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
				ROUND(SUM((jumlah*harga)-((jumlah*harga)*(diskon::NUMERIC/100)))) AS total 
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
        throw "Maaf, pengisian formulir tidak lengkap.";
    }

	try {
		return await prisma.$queryRaw`
			SELECT
                pemesanan.*,
				ROUND(SUM((jumlah*harga)-((jumlah*harga)*(diskon::NUMERIC/100)))) AS total 
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
                ROUND(COUNT(id)) jml
			FROM
                pemesanan
			WHERE
                created_at::DATE = NOW()::DATE
		`;
	} catch (error) {
		throw error;
	}	
}

export const getJmlPemesananCurrentMonthRepository = async () => {
	try {
		return await prisma.$queryRaw`
			SELECT
                ROUND(COUNT(id)) jml
			FROM
                pemesanan
			WHERE
				TO_CHAR(created_at, 'YYYY') = TO_CHAR(NOW(), 'YYYY')
                AND TO_CHAR(created_at, 'MM') = TO_CHAR(NOW(), 'MM')
				AND tgl_selesai IS NOT NULL
		`;
	} catch (error) {
		throw error;
	}	
}

export const getJmlPemesananPrevMonthRepository = async () => {
	try {
		return await prisma.$queryRaw`
			SELECT
                ROUND(COUNT(id)) jml
			FROM
                pemesanan
			WHERE
				TO_CHAR(created_at, 'YYYY') = TO_CHAR((NOW() - INTERVAL '1 month'), 'YYYY')
                AND TO_CHAR(created_at, 'MM') = TO_CHAR((NOW() - INTERVAL '1 month'), 'MM')
				AND tgl_selesai IS NOT NULL
		`;
	} catch (error) {
		throw error;
	}	
}