import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addWilayah = async (req, res) => {
	try {
		let {
			nama,
			ongkir,
		} = req.body;

		if (!nama 
			|| !ongkir
		){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		ongkir = parseInt(ongkir);

		const checkData = await prisma.wilayah.findMany({
			where: {
				nama,
				deleted_at: null
			},
		});

		if(checkData.length > 0){
			return res.status(201).json({
				success: false,
				message: 'Maaf, Wilayah sudah tersedia.'
			});
		}

		const addWilayah = await prisma.wilayah.create({
			data: {
				nama,
				ongkir,
			},
		});

		return res.json({
			success: true,
			message: "Wilayah berhasil disimpan.",
			data: addWilayah,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const updateWilayah = async (req, res) => {
	try {
		let { id } = req.params;

		let {
			nama,
			ongkir,
		} = req.body;

		if (!id 
			|| !nama 
			|| !ongkir 
		){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		id = parseInt(id);
		ongkir = parseInt(ongkir);

		const getWilayahById = await prisma.wilayah.findUnique({
			where: {
			  id,
			},
		});

		const checkData = await prisma.wilayah.findMany({
			where: {
			  nama,
			  NOT: {
				nama: getWilayahById.nama
			  },
			  deleted_at: null
			},
		});


		if(checkData.length > 0){
			return res.status(201).json({
				success: false,
				message: 'Maaf, wilayah tersebut telah tersedia.'
			});
		}	

		const updateWilayah = await prisma.wilayah.update({
			where: {
				id,
			},
			data: {
				nama,
				ongkir,
			},
		});

		return res.json({
			success: true,
			message: "Wilayah berhasil diubah.",
			data: updateWilayah
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const deleteWilayah = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const checkData = await prisma.wilayah.findMany({
			where: {
			  id,
			  NOT: {
				deleted_at: null,
			  },
			},
		});

		if(checkData.length > 0){
			return res.status(500).json({
				success: false,
				message: 'Maaf, wilayah telah terhapus.'
			});
		}

		const currentDate = new Date().toISOString();

		const deleteWilayah = await prisma.wilayah.update({
			where: {
				id,
			},
			data: {
				deleted_at: currentDate,
			},
		});

		return res.json({
			success: true,
			message: "Wilayah berhasil dihapus.",
			data: deleteWilayah
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getWilayahAll = async (req, res) => {
	try {
		const getWilayahAll = await prisma.wilayah.findMany({
			where: {
				deleted_at: null,
			},
            orderBy: [
				{nama: 'asc',},
			],
		});

		// const getWilayahAll = [];

		if(!getWilayahAll.length)
			return res.json({
				success: false,
				message: "Data tidak ada.",
			});

		return res.json({
			success: true,
			message: "Sukses",
			data: getWilayahAll
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getWilayahById = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const getWilayahById = await prisma.wilayah.findFirst({
			where: {
				id,
				deleted_at: null,
			},
		});

		if(!getWilayahById)
			return res.json({
				success: false,
				message: "Data tidak ada.",
			});

		return res.json({
			success: true,
			message: "Sukses",
			data: getWilayahById
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};