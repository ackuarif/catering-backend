import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addPelanggan = async (req, res) => {
	try {
		const { 
			nama,
			user_id,
			password,
			password_confirm,
			telepon,
			alamat 
		} = req.body;

		if (!nama 
			|| !user_id 
			|| !password 
			|| !password_confirm 
			|| !telepon 
			|| !alamat
		){
			return res.status(400).json({
				success: false,
				message: "Missing parameter."
			});
		}

		if (password != password_confirm) {
			return res.status(400).json({
				success: false,
				message: "Password not confirmed."
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
				message: 'Pelanggan already exist.'
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
				alamat,
			},
		});

        const token = jwt.sign({ user_id }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});

		return res.cookie(token).json({
			success: true,
			message: "Pelanggan successfully created",
			data: addPelanggan,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const updatePelanggan = async (req, res) => {
	try {
		const { 
			nama,
			user_id,
			telepon,
			alamat
		} = req.body;
		let { id } = req.params;
		id = parseInt(id);

		if (!id 
			|| !nama 
			|| !user_id 
			|| !telepon 
			|| !alamat
		) {
			return res.status(400).json({
				success: false,
				message: "Missing parameter."
			});
		}

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
				message: 'Pelanggan already exist.'
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
				alamat,
			},
		});

		return res.json({
			success: true,
			message: "Pelanggan successfully updated",
			data: updatePelanggan
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
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
				message: "Missing parameter."
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
				message: 'Pelanggan has been deleted.'
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
		});

		return res.json({
			success: true,
			message: "Pelanggan successfully deleted",
			data: deletePelanggan
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
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
				message: "Missing parameter."
			});
		}

		if (password != password_confirm) {
			return res.status(400).json({
				success: false,
				message: "Password not confirmed."
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
			message: "Password successfully updated",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const login = async (req, res) => {
	try {
		const { user_id, password } = req.body;

		if (!user_id || !password) {
			return res.status(400).json({
				success: false,
				message: "Missing parameter."
			});
		}

		// check user existence
		const user = await prisma.pelanggan.findFirst({ where: { 
            user_id,
            deleted_at: null
        }});

		if (!user) {
            return res.status(404).json({
				success: false,
				message: "User not found."
			});
		}

		//Check password match
		const isMatched = await bcrypt.compare(password, user.password);
		if (!isMatched) {
            return res.status(401).json({
				success: false,
				message: "Password is wrong."
			});
		}

		const token = jwt.sign({ user_id }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});

		return res
			.cookie("token", token)
            .status(200)
			.json({ success: true, message: "LoggedIn Successfully" });
	} catch (error) {
		return res.json({ error: error });
	}
};

export const logout = (req, res) => {
	res.clearCookie("token");
	return res.status(200).json({ success: true, message: "logged out" });
};