import { PrismaClient } from "@prisma/client";
import { getKomplainBalasRepository } from "../repositories/KomplainRepository";

const prisma = new PrismaClient();

export const addKomplain = async (req, res) => {
	try {
		const { 
			ket,
		} = req.body;

		const {
			id: user_id,
			nama,
		} = req.user;

		if (!ket){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const addKomplain = await prisma.komplain.create({
			data: {
				user_id,
				nama,
				ket,
			},
		});

		return res.json({
			success: true,
			message: "Komplain berhasil disimpan.",
			data: addKomplain,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getKomplainAll = async (req, res) => {
	try {
        let { 
			user_id,
		} = req.params;

        user_id = parseInt(user_id);

		const getKomplainAll = await prisma.komplain.findMany({
            where: {
				user_id,
			},
            orderBy: {
                created_at: 'desc',
            },
        });

		if(!getKomplainAll.length)
			return res.json({
				success: false,
				message: "Data tidak ada.",
			});

		return res.json({
			success: true,
			message: "Sukses",
			data: getKomplainAll
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const addKomplainAdmin = async (req, res) => {
	try {
		let { 
			user_id,
			ket,
		} = req.body;

        user_id = parseInt(user_id)
        const user_type = "Admin";

		const {
			nama,
		} = req.user;

		if (!ket){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const addKomplain = await prisma.komplain.create({
			data: {
				user_id,
				nama,
				ket,
				user_type,
			},
		});

        const updateStatus = await prisma.komplain.updateMany({
			where: {
				user_id,
			},
			data: {
				status: '1',
			},
		});

		return res.json({
			success: true,
			message: "Komplain berhasil disimpan.",
			data: addKomplain,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getKomplainBalas = async (req, res) => {
	try {
		const getKomplainBalas = await getKomplainBalasRepository();

		return res.json({
			success: true,
			message: "Sukses",
			data: getKomplainBalas,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};