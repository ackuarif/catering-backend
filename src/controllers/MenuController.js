import { PrismaClient } from "@prisma/client";
import cloudinary from "../libs/cloudinary";

const prisma = new PrismaClient();

export const addMenu = async (req, res) => {
	try {
		let {
			nama,
			harga,
			diskon,
			gambar,
			detail,
			tersedia,
		} = req.body;

		const {
			id: admin_id
		} = req.user;

		if (!nama 
			|| !harga
			|| diskon == ''
			|| gambar == ''
			|| !detail
			|| !tersedia
		){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		harga = parseInt(harga);
		diskon = parseInt(diskon);

		const {
			path,
		} = req.file;

		const checkData = await prisma.menu.findMany({
			where: {
				nama,
				deleted_at: null
			},
		});

		if(checkData.length > 0){
			return res.status(201).json({
				success: false,
				message: 'Maaf, Menu sudah tersedia.'
			});
		}

		const uploadGambar = await cloudinary.uploader.upload(path);

		const addMenu = await prisma.menu.create({
			data: {
				admin_id,
				nama,
				harga,
				diskon,
				gambar: uploadGambar.secure_url,
				detail,
				tersedia,
			},
		});

		return res.json({
			success: true,
			message: "Menu berhasil disimpan.",
			data: addMenu,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const updateMenu = async (req, res) => {
	try {
		let { id } = req.params;

		let {
			nama,
			harga,
			diskon,
			detail,
			tersedia,
		} = req.body;

		const {
			id: admin_id
		} = req.user;

		if (!id 
			|| !nama 
			|| !harga 
			|| diskon == '' 
			|| !detail
			|| !tersedia
		){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		id = parseInt(id);
		admin_id = parseInt(admin_id);
		harga = parseInt(harga);
		diskon = parseInt(diskon);

		const getMenuById = await prisma.menu.findUnique({
			where: {
			  id,
			},
		});

		const checkData = await prisma.menu.findMany({
			where: {
			  nama,
			  NOT: {
				nama: getMenuById.nama
			  },
			  deleted_at: null
			},
		});

		if(checkData.length > 0){
			return res.status(201).json({
				success: false,
				message: 'Maaf, menu tersebut telah tersedia.'
			});
		}	

		let gambar = getMenuById.gambar;

		if(req.file){
			const {path} = req.file;
			const uploadGambar = await cloudinary.uploader.upload(path);
			gambar = uploadGambar.secure_url;
		}

		const updateMenu = await prisma.menu.update({
			where: {
				id,
			},
			data: {
				admin_id,
				nama,
				harga,
				diskon,
				gambar,
				detail,
				tersedia,
			},
		});

		return res.json({
			success: true,
			message: "Menu berhasil diubah.",
			data: updateMenu
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const deleteMenu = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const checkData = await prisma.menu.findMany({
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
				message: 'Maaf, menu telah terhapus.'
			});
		}

		const currentDate = new Date().toISOString();

		const deleteMenu = await prisma.menu.update({
			where: {
				id,
			},
			data: {
				deleted_at: currentDate,
			},
		});

		return res.json({
			success: true,
			message: "Menu berhasil dihapus.",
			data: deleteMenu
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getMenuAll = async (req, res) => {
	try {
		const getMenuAll = await prisma.menu.findMany({
			where: {
				deleted_at: null,
			},
		});

		// const getMenuAll = [];

		if(!getMenuAll.length)
			return res.json({
				success: false,
				message: "Data tidak ada.",
			});

		getMenuAll.forEach((elm) => {
			elm.detail = elm.detail.substr(0,100)+"...";
		});

		return res.json({
			success: true,
			message: "Sukses",
			data: getMenuAll
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getMenuById = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const getMenuById = await prisma.menu.findFirst({
			where: {
				id,
				deleted_at: null,
			},
		});

		if(!getMenuById)
			return res.json({
				success: false,
				message: "Data tidak ada.",
			});

		return res.json({
			success: true,
			message: "Sukses",
			data: getMenuById
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};