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
				message: "Missing parameter."
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
		
		const addKeranjang = await prisma.keranjang.create({
			data: {
				menu_id,
				pelanggan_id,
				jumlah,
				harga,
				diskon,
			},
		});

		return res.json({
			success: true,
			message: "Keranjang successfully created",
			data: addKeranjang,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
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
				message: "Missing parameter."
			});
		}

		const deleteKeranjang = await prisma.keranjang.delete({
			where: {
				id,
				pemesanan_id: null,
			},
		});

		return res.json({
			success: true,
			message: "Keranjang successfully deleted",
			data: deleteKeranjang
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
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

		return res.json({
			success: true,
			message: "Success",
			data: getKeranjangAll,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const getKeranjangById = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Missing parameter."
			});
		}

		const getKeranjangById = await prisma.keranjang.findFirst({
			where: {
				id,
				deleted_at: null,
			},
		});

		return res.json({
			success: true,
			message: "Success",
			data: getKeranjangById
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};