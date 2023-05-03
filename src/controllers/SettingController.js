import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateSetting = async (req, res) => {
	try {
		const { 
			info_pembayaran,
		} = req.body;

		if (!info_pembayaran) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const updateSetting = await prisma.setting.updateMany({
			where: {
				NOT: {
                    id: 0,
                }
			},
			data: {
				info_pembayaran,
			},
		});

		return res.json({
			success: true,
			message: "Data setting berhasil diubah.",
			data: updateSetting
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getSettingAll = async (req, res) => {
	try {
		const getSettingAll = await prisma.setting.findMany();

		return res.json({
			success: true,
			message: "Sukses",
			data: getSettingAll
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};