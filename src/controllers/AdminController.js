import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addAdmin = async (req, res) => {
	try {
		const { 
			nama,
			user_id,
			password,
			password_confirm,
		} = req.body;

		if (!nama 
			|| !user_id 
			|| !password 
			|| !password_confirm
		){
			return res.status(400).json({
				success: false,
				message: "Maaf, Maaf, pengisian formulir tidak lengkap."
			});
		}

		if (password != password_confirm) {
			return res.status(400).json({
				success: false,
				message: "Maaf, Password tidak sesuai."
			});
		}

		const checkData = await prisma.admin.findMany({
			where: {
			  user_id,
			},
		});

		if(checkData.length > 0){
			return res.status(201).json({
				success: false,
				message: 'Maaf, User ID tersebut telah tersedia.'
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const addAdmin = await prisma.admin.create({
			data: {
				nama,
				user_id,
				password: hashPassword,
			},
		});

        const token = jwt.sign({ user_id }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});

		return res.cookie(token).json({
			success: true,
			message: "Data admin berhasil disimpan.",
			data: addAdmin,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const updateAdmin = async (req, res) => {
	try {
		const { 
			nama,
			user_id,
		} = req.body;
		let { id } = req.params;
		id = parseInt(id);

		if (!id 
			|| !nama 
			|| !user_id
		) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const getAdminById = await prisma.admin.findUnique({
			where: {
			  id,
			},
		});

		const checkData = await prisma.admin.findMany({
			where: {
			  user_id,
			  NOT: {
				user_id: getAdminById.user_id
			  }
			},
		});

		if(checkData.length > 0){
			return res.status(201).json({
				success: false,
				message: 'Maaf, User ID terebut telah tersedia.'
			});
		}		

		const updateAdmin = await prisma.admin.update({
			where: {
				id,
			},
			data: {
				nama,
				user_id,
			},
		});

		return res.json({
			success: true,
			message: "Data admin berhasil diubah.",
			data: updateAdmin
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const deleteAdmin = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const checkData = await prisma.admin.findMany({
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
				message: 'Maaf, Data admin tersebut telah terhapus.'
			});
		}

		const currentDate = new Date().toISOString();

		const deleteAdmin = await prisma.admin.update({
			where: {
				id,
			},
			data: {
				deleted_at: currentDate,
			},
		});

		return res.json({
			success: true,
			message: "Data admin berhasil dihapus.",
			data: deleteAdmin
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const updatePassword = async (req, res) => {
	try {
		const { 
			password,
			password_confirm,
		} = req.body;
		let { id } = req.params;
		id = parseInt(id);

		if (!id 
			|| !password 
			|| !password_confirm
		) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		if (password != password_confirm) {
			return res.status(400).json({
				success: false,
				message: "Maaf, Password tidak sesuai."
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const updatePassword = await prisma.admin.update({
			where: {
				id,
			},
			data: {
				password: hashPassword,
			},
		});

		return res.json({
			success: true,
			message: "Password berhasil diubah.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const login = async (req, res) => {
	try {
		const { user_id, password } = req.body;

		if (!user_id || !password) {
			return res.status(400).json({
				success: false,
				message: req.body
			});
		}

		// check user existence
		const user = await prisma.admin.findFirst({ where: { 
            user_id,
            deleted_at: null
        }});

		if (!user) {
            return res.status(404).json({
				success: false,
				message: "Maaf, User tidak ditemukan."
			});
		}

		//Check password match
		const isMatched = await bcrypt.compare(password, user.password);
		if (!isMatched) {
            return res.status(401).json({
				success: false,
				message: "Maaf, Password tidak sesuai."
			});
		}

		const token = jwt.sign({ user_id }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});

		return res
			.cookie("token", token)
            .status(200)
			.json({ success: true, message: "Berhasil login.", token });
	} catch (error) {
		return res.json({ error: error });
	}
};

export const logout = (req, res) => {
	res.clearCookie("token");
	return res.status(200).json({ success: true, message: "Berhasil logout." });
};

export const getSelfUser = (req, res) => {
	return res.status(200).json({ success: true, message: "Sukses.",data: req.user });
};

export const getAdminAll = async (req, res) => {
	try {
		const getAdminAll = await prisma.admin.findMany({
			where: {
				deleted_at: null,
			},
		});

		// const getMenuAll = [];

		if(!getAdminAll.length)
			return res.json({
				success: false,
				message: "Data tidak ada.",
			});


		return res.json({
			success: true,
			message: "Sukses",
			data: getAdminAll
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const getAdminById = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const getAdminById = await prisma.admin.findFirst({
			where: {
				id,
				deleted_at: null,
			},
		});

		if(!getAdminById)
			return res.json({
				success: false,
				message: "Data tidak ada.",
			});

		return res.json({
			success: true,
			message: "Sukses",
			data: getAdminById
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};