import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addKeranjang = async (req, res) => {
	try {
		let {
			menu_id,
			jumlah,
		} = req.body;

		const {
			id: pelanggan_id
		} = req.user;

		if (!menu_id 
			|| !jumlah
		){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		menu_id = parseInt(menu_id);
		jumlah = parseInt(jumlah);

		const getMenuById = await prisma.menu.findFirst({
			where: {
				id: menu_id,
			},
		});
		
		const {
			harga,
			diskon,
		} = getMenuById;

		const deleteKeranjang = await prisma.keranjang.deleteMany({
			where: {
				pemesanan_id: null,
				menu_id,
				pelanggan_id,
			},
		});

		const data =  {
			menu_id,
			pelanggan_id,
			jumlah,
			harga,
			diskon
		}

		const addKeranjang = await prisma.keranjang.create({
			data,
			include: {
				menu: true
			},
		});

		return res.json({
			success: true,
			message: "Berhasil mengisi keranjang.",
			data: addKeranjang,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const deleteKeranjang = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const deleteKeranjang = await prisma.keranjang.deleteMany({
			where: {
				id,
				pemesanan_id: null,
			},
		});

		return res.json({
			success: true,
			message: "Item berhasil dihapus.",
			data: deleteKeranjang
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getKeranjangAll = async (req, res) => {
	try {
		const {
			id: pelanggan_id
		} = req.user;

		const getKeranjangAll = await prisma.keranjang.findMany({
			where: {
				pemesanan_id: null,
				pelanggan_id,
			},
			include: {
				menu: true,
			}
		});

		if (getKeranjangAll.length == 0) {
			return res.status(400).json({
				success: false,
				message: "Maaf, Data tidak ditemukan."
			});
		}

		return res.json({
			success: true,
			message: "Sukses.",
			data: getKeranjangAll,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getKeranjangByPemesananId = async (req, res) => {
	try {
		let { id } = req.params;
		if (!id){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}
		id = parseInt(id);

		const getKeranjangByPemesananId = await prisma.keranjang.findMany({
			where: {
				pemesanan_id: id,
			},
			include: {
				menu: true,
			}
		});

		return res.json({
			success: true,
			message: "Sukses",
			data: getKeranjangByPemesananId,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getTotalKeranjangByPelanggan = async (req, res) => {
	try {
		let {
			id: pelanggan_id
		} = req.user;

		const getTotalKeranjangByPelanggan = await prisma.$queryRaw`
			SELECT
				ROUND(SUM((keranjang.jumlah*keranjang.harga)-((keranjang.jumlah*keranjang.harga)*(keranjang.diskon::NUMERIC/100)))) AS catering, 
				ROUND(MIN(wilayah.ongkir)) AS ongkir, 
				ROUND(SUM((keranjang.jumlah*keranjang.harga)-((keranjang.jumlah*keranjang.harga)*(keranjang.diskon::NUMERIC/100)))+MIN(wilayah.ongkir)) AS total 
			FROM
				keranjang,
				pelanggan,
				wilayah
			WHERE
				keranjang.pelanggan_id = ${pelanggan_id}
				AND pelanggan.id = keranjang.pelanggan_id
				AND pelanggan.wilayah_id = wilayah.id
				AND keranjang.pemesanan_id is null
		`;

		return res.json({
			success: true,
			message: "Sukses",
			data: getTotalKeranjangByPelanggan
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}	
}

export const getTotalByPemesananId = async (req, res) => {
	try {
		let { id } = req.params;
		if (!id){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}
		id = parseInt(id);

		const getTotalByPemesananId = await prisma.$queryRaw`
			SELECT
				ROUND(SUM((keranjang.jumlah*keranjang.harga)-((keranjang.jumlah*keranjang.harga)
				*(keranjang.diskon::NUMERIC/100)))) as catering,
				ROUND(SUM((keranjang.jumlah*keranjang.harga)-((keranjang.jumlah*keranjang.harga)
				*(keranjang.diskon::NUMERIC/100)))+MIN(pemesanan.ongkir)) AS total,
				MIN(pemesanan.ongkir) as ongkir 
			FROM
				pemesanan,
				keranjang
			WHERE
				pemesanan.id = keranjang.pemesanan_id
				AND keranjang.pemesanan_id = ${id}
		`;

		return res.json({
			success: true,
			message: "Success",
			data: getTotalByPemesananId
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}	
}