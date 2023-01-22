import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addMenu = async (req, res) => {
	try {
		const {
			admin_id,
			nama,
			harga,
			diskon,
			gambar,
			detail,
		} = req.body;

		if (!admin_id 
			|| !nama 
			|| !harga
			|| !gambar
			|| !detail
		){
			return res.status(400).json({
				success: false,
				message: "Missing parameter."
			});
		}

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

		const addMenu = await prisma.menu.create({
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
		const {
			admin_id,
			nama,
			harga,
			diskon,
			gambar,
			detail,
		} = req.body;
		let { id } = req.params;
		id = parseInt(id);

		if (!id 
			|| !admin_id 
			|| !nama 
			|| !harga 
			|| !gambar 
			|| !detail
		){
			return res.status(400).json({
				success: false,
				message: "Missing parameter."
			});
		}

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