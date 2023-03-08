import { PrismaClient } from "@prisma/client";
import { getLogTodayRepository } from "../repositories/LogRepository";

const prisma = new PrismaClient();

export const addLog = async (req, res) => {
	try {
		let {
			ip_address,
		} = req.body;

		if (!ip_address){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const addLog = await prisma.logs.create({
            data: {
                ip_address,
            }
        });

		return res.json({
			success: true,
			message: "Log berhasil disimpan.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getLogToday = async (req, res) => {
	try {
		const getLogToday = await getLogTodayRepository()

		return res.json({
			success: true,
			message: "Log berhasil disimpan.",
			data: getLogToday,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};