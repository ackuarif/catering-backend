import { PrismaClient } from "@prisma/client";
import moment from "moment/moment";
import { toDate } from "../libs/datetime";
import cloudinary from "../libs/cloudinary";
import { 
	getJmlPemesananTodayRepository,
	getPemesananProsesRepository, 
	getPemesananSelesaiRepository, 
	getPemesananVerifRepository, 
	laporanPendapatanByDateRepository
} from "../repositories/PemesananRepository";

const prisma = new PrismaClient();

export const addPemesanan = async (req, res) => {
	try {
		let {
			tgl_antar,
			ket,
		} = req.body;

		const {
			id: pelanggan_id
		} = req.user;

		if (!tgl_antar){
			return res.status(400).json({
				success: false,
				message: "Maaf, Parameter tidak lengkap."
			});
		}
		
        const no_pesan = 'P'+moment().format('DDMMYYHHmmss');
        tgl_antar = toDate(tgl_antar);

		const addPemesanan = await prisma.pemesanan.create({
			data: {
				pelanggan_id,
				no_pesan,
				tgl_antar,
				ket,
			},
		});

        const updateKeranjangByPelangganId = await prisma.keranjang.updateMany({
			where: {
				pelanggan_id,
			},
			data: {
				pemesanan_id: addPemesanan.id,
			},
		});

		return res.json({
			success: true,
			message: "Pemesanan berhasil disimpan.",
			data: addPemesanan,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const deletePemesanan = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Maaf, Parameter tidak lengkap."
			});
		}

		const checkPemesanan = await prisma.pemesanan.findMany({
			where: {
				id,
				NOT: {
					tgl_bayar: null,
				}
			}
		})

		if(checkPemesanan.length > 0){
			return res.json({
				success: true,
				message: "Maaf, pemesanan telah terbayar.",
			});		
		}

		const deletePemesanan = await prisma.pemesanan.deleteMany({
			where: {
				id,
				tgl_bayar: null,
			},
		});

		return res.json({
			success: true,
			message: "Pemesanan berhasil dibatal.",
			data: deletePemesanan
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const getPemesananAll = async (req, res) => {
	try {
		const {
			id: pelanggan_id
		} = req.user;

		const getPemesananAll = await prisma.pemesanan.findMany({
			where: {
				pelanggan_id,
			},
		});

		return res.json({
			success: true,
			message: "Sukses",
			data: getPemesananAll,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const getById = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		const {
			id: pelanggan_id
		} = req.user;

		const getById = await prisma.pemesanan.findFirst({
			where: {
				id,
				pelanggan_id,
			},
		});

		return res.json({
			success: true,
			message: "Sukses",
			data: getById,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const addPembayaran = async (req, res) => {
	try {
		let {
			id,
			tgl_bayar,
			bukti_bayar,
		} = req.body;

		if (!id
			|| !tgl_bayar
			|| bukti_bayar == ''
		){
			return res.status(400).json({
				success: false,
				message: "Maaf, Parameter tidak lengkap."
			});
		}

		const {
			path,
		} = req.file;

		id = parseInt(id);
        tgl_bayar = toDate(tgl_bayar);

		const checkPembayaran = await prisma.pemesanan.findMany({
			where: {
				id,
				NOT: {
					tgl_bayar: null,
				},
			},
		});

		if(checkPembayaran.length > 0){
			return res.status(400).json({
				success: false,
				message: "Maaf, pemesanan tersebut telah terbayar."
			});			
		}

		const uploadBuktiBayar = await cloudinary.uploader.upload(path);

        const updatePembayaran = await prisma.pemesanan.update({
			where: {
				id,
			},
			data: {
				tgl_bayar,
				bukti_bayar: uploadBuktiBayar.secure_url,
			},
		});

		return res.json({
			success: true,
			message: "Pembayaran berhasil disimpan.",
			data: updatePembayaran,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const getPemesananVerif = async (req, res) => {
	try {
		const getPemesananVerif = await getPemesananVerifRepository();

		return res.json({
			success: true,
			message: "Sukses",
			data: getPemesananVerif,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const verifPemesanan = async (req, res) => {
	try {
		let { id } = req.params;

		if (!id){
			return res.status(400).json({
				success: false,
				message: "Maaf, Parameter tidak lengkap."
			});
		}

		id = parseInt(id);

		const checkData = await prisma.pemesanan.findMany({
			where: {
				id,
				tgl_bayar: null
			},
		});

		if(checkData.length > 0){
			return res.status(400).json({
				success: false,
				message: "Maaf, pemesanan tersebut belum terbayar."
			});			
		}

		const currentDate = new Date().toISOString();

        const verifPemesanan = await prisma.pemesanan.update({
			where: {
				id,
			},
			data: {
				tgl_verif: currentDate,
			},
		});

		return res.json({
			success: true,
			message: "Pembayaran berhasil disimpan.",
			data: verifPemesanan,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const getPemesananProses = async (req, res) => {
	try {
		const getPemesananProses = await getPemesananProsesRepository();

		return res.json({
			success: true,
			message: "Sukses",
			data: getPemesananProses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};


export const selesaiPemesanan = async (req, res) => {
	try {
		let { id } = req.params;

		if (!id){
			return res.status(400).json({
				success: false,
				message: "Maaf, Parameter tidak lengkap."
			});
		}

		id = parseInt(id);

		const checkData = await prisma.pemesanan.findMany({
			where: {
				id,
				tgl_verif: null
			},
		});

		if(checkData.length > 0){
			return res.status(400).json({
				success: false,
				message: "Maaf, pemesanan tersebut belum terverifikasi."
			});			
		}

		const currentDate = new Date().toISOString();

        const selesaiPemesanan = await prisma.pemesanan.update({
			where: {
				id,
			},
			data: {
				tgl_selesai: currentDate,
			},
		});

		return res.json({
			success: true,
			message: "Pembayaran berhasil disimpan.",
			data: selesaiPemesanan,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const getPemesananSelesai = async (req, res) => {
	try {
		const getPemesananSelesai = await getPemesananSelesaiRepository();

		return res.json({
			success: true,
			message: "Sukses",
			data: getPemesananSelesai,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const laporanPendapatanByDate = async (req, res) => {
	try {
		const laporanPendapatanByDate = await laporanPendapatanByDateRepository(req.body);

		return res.json({
			success: true,
			message: "Sukses",
			data: laporanPendapatanByDate,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const getJmlPemesananToday = async (req, res) => {
	try {
		const getJmlPemesananToday = await getJmlPemesananTodayRepository();

		return res.json({
			success: true,
			message: "Sukses",
			data: getJmlPemesananToday,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};