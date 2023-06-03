import { PrismaClient } from "@prisma/client";
import { getAvgRatingByMenuIdRepository } from "../repositories/TestimoniRepository";

const prisma = new PrismaClient();

export const addTestimoni = async (req, res) => {
	try {
		let { 
            pemesanan_id,
			rates,
			kets,
		} = req.body;

        pemesanan_id = parseInt(pemesanan_id)

		const {
			nama,
		} = req.user;

		if (!rates || rates.length == 0){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

        await prisma.testimoni.deleteMany({
			where: {
				pemesanan_id,
			},
		});

        rates.forEach(async (elm) => {
            await prisma.testimoni.create({
                data: {
                    pemesanan_id,
                    menu_id: elm.menu_id,
                    rating: elm.rating,
                    nama,
                },
            });
        });

        kets.forEach(async (elm) => {
            await prisma.testimoni.updateMany({
                where: {
                    pemesanan_id,
                    menu_id: elm.menu_id,
                },
                data: {
                    ket: elm.ket,
                },
            });
        });


		return res.json({
			success: true,
			message: "Testimoni berhasil disimpan.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getTestimoniByPemesananId = async (req, res) => {
	try {
        let { 
			pemesanan_id,
		} = req.params;

        pemesanan_id = parseInt(pemesanan_id)

		const getTestimoniByPemesananId = await prisma.testimoni.findMany({
            where: {
				pemesanan_id,
			},
            include: {
				menu: true
			},
        });

		if(!getTestimoniByPemesananId.length)
			return res.json({
				success: false,
				message: "Data tidak ada.",
			});

		return res.json({
			success: true,
			message: "Sukses",
			data: getTestimoniByPemesananId
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getTestimoniByMenuId = async (req, res) => {
	try {
        let { 
			menu_id,
		} = req.params;

        menu_id = parseInt(menu_id)

		const getTestimoniByMenuId = await prisma.testimoni.findMany({
            where: {
				menu_id,
			},
            orderBy: [
				{created_at: 'desc',},
            ]
        });

		if(!getTestimoniByMenuId.length)
			return res.json({
				success: false,
				message: "Data tidak ada.",
			});

		return res.json({
			success: true,
			message: "Sukses",
			data: getTestimoniByMenuId
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getAvgRatingByMenuId = async (req, res) => {
	try {
        let { 
			menu_id,
		} = req.params;

        menu_id = parseInt(menu_id)

		const getAvgRatingByMenuId = await getAvgRatingByMenuIdRepository(menu_id);

		return res.json({
			success: true,
			message: "Sukses",
			data: getAvgRatingByMenuId,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};