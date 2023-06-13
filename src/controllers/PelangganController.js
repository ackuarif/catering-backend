import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addPelanggan = async (req, res) => {
	try {
		let { 
			nama,
			user_id,
			password,
			password_confirm,
			telepon,
			wilayah_id,
			alamat 
		} = req.body;

		if (!nama 
			|| !user_id 
			|| !password 
			|| !password_confirm 
			|| !telepon
			|| !wilayah_id
			|| !alamat
		){
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		wilayah_id = parseInt(wilayah_id)

		if (password != password_confirm) {
			return res.status(400).json({
				success: false,
				message: "Maaf, password tidak sesuai."
			});
		}

		const checkData = await prisma.pelanggan.findMany({
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

		const addPelanggan = await prisma.pelanggan.create({
			data: {
				nama,
				user_id,
				password: hashPassword,
				telepon,
				wilayah_id,
				telepon,
				alamat,
			},
			select: {
				id: true,
				user_id: true,
				nama: true,
				telepon: true,
				wilayah_id: true,
				alamat: true,
			},
		});

        const token = jwt.sign({ user_id }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});

		return res.cookie(token).json({
			success: true,
			message: "Registrasi berhasil.",
			data: addPelanggan,
			token,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const updatePelanggan = async (req, res) => {
	try {
		let { 
			user_id,
			nama,
			telepon,
			wilayah_id,
			alamat
		} = req.body;

		const {
			id,
		} = req.user;

		if (!nama 
			|| !telepon
			|| !wilayah_id
			|| !alamat
		) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		wilayah_id = parseInt(wilayah_id)
		
		const getPelangganById = await prisma.pelanggan.findUnique({
			where: {
			  id,
			},
		});

		const checkData = await prisma.pelanggan.findMany({
			where: {
			  user_id,
			  NOT: {
				user_id: getPelangganById.user_id
			  }
			},
		});

		if(checkData.length > 0){
			return res.status(201).json({
				success: false,
				message: 'Maaf, User ID tersebut telah tersedia.'
			});
		}		

		const updatePelanggan = await prisma.pelanggan.update({
			where: {
				id,
			},
			data: {
				nama,
				user_id,
				telepon,
				wilayah_id,
				alamat,
			},
			select: {
				id: true,
				user_id: true,
				nama: true,
				telepon: true,
				wilayah_id: true,
				alamat: true,
			},
		});

		return res.json({
			success: true,
			message: "Data berhasil diubah.",
			data: updatePelanggan
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const deletePelanggan = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id);

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		const checkData = await prisma.pelanggan.findMany({
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
				message: 'Maaf, Pelanggan telah terhapus.'
			});
		}

		const currentDate = new Date().toISOString();

		const deletePelanggan = await prisma.pelanggan.update({
			where: {
				id,
			},
			data: {
				deleted_at: currentDate,
			},
			select: {
				id: true,
				user_id: true,
				nama: true,
				alamat: true,
			},
		});

		return res.json({
			success: true,
			message: "Pelanggan berhasil dihapus.",
			data: deletePelanggan
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

		const {
			id,
		} = req.user;

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
				message: "Maaf, password tidak sesuai."
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const updatePassword = await prisma.pelanggan.update({
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
				message: "Maaf, pengisian formulir tidak lengkap."
			});
		}

		// check user existence
		const user = await prisma.pelanggan.findFirst({ 
			where: { 
				user_id,
				deleted_at: null
        	},
		});


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
				message: "Maaf, password tidak sesuai."
			});
		}

		const token = jwt.sign({ user_id }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});

		return res
			.cookie("token", token)
            .status(200)
			.json({ 
				success: true,
				message: "Berhasil login.", 
				token, 
				user,
			});
	} catch (error) {
		return res.json({ error: error });
	}
};

export const logout = (req, res) => {
	res.clearCookie("token");
	return res.status(200).json({ success: true, message: "Berhasil logout." });
};

export const getSelfUser = async (req, res) => {
	const ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress ||  req.socket.remoteAddress || req.connection.socket.remoteAddress;
	await prisma.logs.create({
		data: {
			ip_address,
		}
	});
	return res.status(200).json({ success: true, message: "Berhasil login.",data: req.user });
};