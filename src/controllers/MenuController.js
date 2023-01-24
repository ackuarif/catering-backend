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
		} = req.body;

		const {
			id: admin_id
		} = req.user;

		if (!nama 
			|| !harga
			|| diskon == ''
			|| gambar == ''
			|| !detail
		){
			return res.status(400).json({
				success: false,
				message: "Missing parameter."
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
				message: 'Menu already exist.'
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
			},
		});

		return res.json({
			success: true,
			message: "Menu successfully created",
			data: addMenu,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
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
		} = req.body;

		const {
			id: admin_id
		} = req.user;

		if (!id 
			|| !nama 
			|| !harga 
			|| diskon == '' 
			|| !detail
		){
			return res.status(400).json({
				success: false,
				message: "Missing parameter."
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
				message: 'Menu already exist.'
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
			},
		});

		return res.json({
			success: true,
			message: "Menu successfully updated",
			data: updateMenu
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
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
				message: "Missing parameter."
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
				message: 'Menu has been deleted.'
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
			message: "Menu successfully deleted",
			data: deleteMenu
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
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

		return res.json({
			success: true,
			message: "Success",
			data: getMenuAll
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
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
				message: "Missing parameter."
			});
		}

		const getMenuById = await prisma.menu.findFirst({
			where: {
				id,
				deleted_at: null,
			},
		});

		return res.json({
			success: true,
			message: "Success",
			data: getMenuById
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};