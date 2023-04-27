import { PrismaClient } from "@prisma/client";
import { getChatBalasRepository } from "../repositories/ChatRepository";
import moment from "moment/moment";

const prisma = new PrismaClient();

export const addChatPelanggan = async (req, res) => {
	try {
		let {
			pemesanan_id,
			chat,
		} = req.body;

		const {
			nama,
		} = req.user;

		if (!pemesanan_id 
			|| !chat
		){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		pemesanan_id = parseInt(pemesanan_id);

		const addChat = await prisma.chat.create({
            data: {
                pemesanan_id,
                nama,
                chat,
            }
        });

		return res.json({
			success: true,
			message: "Chat berhasil disimpan.",
			data: addChat,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const addChatAdmin = async (req, res) => {
	try {
		let {
			pemesanan_id,
			chat,
		} = req.body;

		const {
			nama,
		} = req.user;

		if (!pemesanan_id 
			|| !chat
		){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		pemesanan_id = parseInt(pemesanan_id);

		const addChat = await prisma.chat.create({
            data: {
                pemesanan_id,
                nama,
                user_type: 'Admin',
                chat,
            }
        });

		const updateStatus = await prisma.chat.updateMany({
			where: {
				pemesanan_id,
			},
			data: {
				status: '1',
			},
		});

		return res.json({
			success: true,
			message: "Chat berhasil disimpan.",
			data: addChat,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getChatByPemesananId = async (req, res) => {
	try {
		let { id } = req.params;
		if (!id){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}
		id = parseInt(id);

		const getChatByPemesananId = await prisma.chat.findMany({
			where: {
				pemesanan_id: id,
			},
			orderBy: [
				{created_at: 'desc',},
			],
		});

		if(getChatByPemesananId.length == 0)
			return res.status(400).json({
				success: false,
				message: "Maaf, data tidak ditemukan."
			});

		getChatByPemesananId.map((data) => {
			data.created_at = moment(data.created_at).format("YYYY-MM-DD HH:mm:ss")
		})

		return res.json({
			success: true,
			message: "Sukses",
			data: getChatByPemesananId,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getChatBalas = async (req, res) => {
	try {
		const getChatBalas = await getChatBalasRepository();

		return res.json({
			success: true,
			message: "Sukses",
			data: getChatBalas,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};