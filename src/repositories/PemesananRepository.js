import { PrismaClient } from "@prisma/client";
import { query } from "express";
import moment from "moment/moment";
import { toDate, toDateOnly } from "../libs/datetime";

const prisma = new PrismaClient();

export const getPemesananVerifRepository = async () => {
	try {
		const getDatas = await prisma.$queryRaw`
			SELECT
                pemesanan.*,
                pelanggan.nama,
                pelanggan.alamat,
                pelanggan.telepon,
				ROUND(SUM((jumlah*harga)-((jumlah*harga)*(diskon::NUMERIC/100)))) AS total 
			FROM
                pemesanan,
				keranjang,
				pelanggan
			WHERE
                pemesanan.id = keranjang.pemesanan_id
                AND pemesanan.pelanggan_id = pelanggan.id
                AND pemesanan.tgl_verif IS NULL
                AND pemesanan.tgl_bayar IS NOT NULL
            GROUP BY
                pemesanan.id,
                pelanggan.id
		`;

		getDatas.map((data) => {
			data.tgl_pesan = moment(data.tgl_pesan).format("YYYY-MM-DD HH:mm:ss")
		})

		return getDatas;
	} catch (error) {
		throw error;
	}	
}

export const getPemesananProsesRepository = async () => {
	try {
		const getDatas = await prisma.$queryRaw`
			SELECT
                pemesanan.*,
                pelanggan.nama,
                pelanggan.alamat,
                pelanggan.telepon,
				ROUND(SUM((jumlah*harga)-((jumlah*harga)*(diskon::NUMERIC/100)))) AS total 
			FROM
                pemesanan,
				keranjang,
				pelanggan
			WHERE
                pemesanan.id = keranjang.pemesanan_id
                AND pemesanan.pelanggan_id = pelanggan.id
                AND pemesanan.tgl_verif IS NOT NULL
                AND pemesanan.tgl_selesai IS NULL
            GROUP BY
                pemesanan.id,
                pelanggan.id
		`;

		getDatas.map((data) => {
			data.tgl_pesan = moment(data.tgl_pesan).format("YYYY-MM-DD HH:mm:ss")
		})

		return getDatas;
	} catch (error) {
		throw error;
	}	
}

export const getPemesananSelesaiRepository = async () => {
	try {
		const getDatas = await prisma.$queryRaw`
			SELECT
                pemesanan.*,
                pelanggan.nama,
                pelanggan.alamat,
                pelanggan.telepon,
				ROUND(SUM((jumlah*harga)-((jumlah*harga)*(diskon::NUMERIC/100)))) AS total 
			FROM
                pemesanan,
				keranjang,
				pelanggan
			WHERE
                pemesanan.id = keranjang.pemesanan_id
                AND pemesanan.pelanggan_id = pelanggan.id
                AND pemesanan.tgl_selesai IS NOT NULL
            GROUP BY
                pemesanan.id,
                pelanggan.id
		`;

		getDatas.map((data) => {
			data.tgl_pesan = moment(data.tgl_pesan).format("YYYY-MM-DD HH:mm:ss")
		})

		return getDatas;
	} catch (error) {
		throw error;
	}	
}

export const laporanPendapatanByDateRepository = async (req) => {
	try {
		let {
			tgl_dari,
			tgl_sampai,
		} = req;
	
		if (!tgl_dari
			|| !tgl_sampai
		){
			throw "Maaf, pengisian formulir tidak lengkap.";
		}

		const getDatas = await prisma.$queryRaw`
			SELECT
                pemesanan.*,
				pelanggan.*,
				ROUND(SUM((jumlah*harga)-((jumlah*harga)*(diskon::NUMERIC/100)))) AS total 
			FROM
                pemesanan,
				keranjang,
				pelanggan
			WHERE
                pemesanan.id = keranjang.pemesanan_id
                AND pemesanan.pelanggan_id = pelanggan.id
                AND tgl_verif IS NOT NULL
                AND pemesanan.tgl_bayar::DATE BETWEEN ${tgl_dari}::DATE AND ${tgl_sampai}::DATE
            GROUP BY
                pemesanan.id,
                pelanggan.id
		`;

		getDatas.map((data) => {
			data.tgl_bayar = moment(data.tgl_bayar).format("YYYY-MM-DD HH:mm:ss")
		})

		return getDatas;
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

export const getPemesananHeaderByIdRepository = async (id) => {
	try {
		if (!id){
			throw "Maaf, pengisian formulir tidak lengkap.";
		}
	
		id = parseInt(id);

		const getDatas = await prisma.$queryRaw`
			SELECT
                pemesanan.*,
                pelanggan.nama,
                pelanggan.alamat,
                pelanggan.telepon,
				ROUND(SUM((jumlah*harga)-((jumlah*harga)*(diskon::NUMERIC/100)))) AS total 
			FROM
                pemesanan,
				keranjang,
				pelanggan
			WHERE
                pemesanan.id = keranjang.pemesanan_id
                AND pemesanan.pelanggan_id = pelanggan.id
                AND pemesanan.id = ${id}
            GROUP BY
                pemesanan.id,
                pelanggan.id
		`;

		getDatas.map((data) => {
			data.tgl_pesan = moment(data.tgl_pesan).format("YYYY-MM-DD HH:mm:ss")
			data.tgl_bayar = moment(data.tgl_bayar).format("YYYY-MM-DD HH:mm:ss")
			data.tgl_verif = moment(data.tgl_verif).format("YYYY-MM-DD HH:mm:ss")
			data.tgl_selesai = moment(data.tgl_selesai).format("YYYY-MM-DD HH:mm:ss")
		})

		return getDatas;
	} catch (error) {
		throw error;
	}	
}