import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const pelangganIsAuthenticated = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		let token = '';
		
		if(!authorization)
			return res.status(400).json({
				success: false,
				message: "Maaf, mohon login terlebih dahulu."
			});

		if(authorization.split(' ')[0] == 'Bearer')
			token = authorization.split(' ')[1];

		if (!token || token == '')
			return res.status(400).json({
				success: false,
				message: "Maaf, mohon login terlebih dahulu."
			});

		const verify = jwt.verify(token, process.env.SECRET_KEY);
		req.user = await prisma.pelanggan.findFirst({ 
			where: { user_id: verify.user_id }, 
			select: {
				id: true,
				user_id: true,
				nama: true,
				alamat: true,
			},
		});
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

export const adminIsAuthenticated = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		let token = '';

		if(!authorization)
			return res.status(400).json({
				success: false,
				message: "Maaf, mohon login terlebih dahulu."
			});

		if(authorization.split(' ')[0] == 'Bearer')
			token = authorization.split(' ')[1];

		if (!token || token == '')
			return res.status(400).json({
				success: false,
				message: "Maaf, mohon login terlebih dahulu."
			});

		const verify = jwt.verify(token, process.env.SECRET_KEY);

		req.user = await prisma.admin.findFirst({ 
			where: { user_id: verify.user_id }, 
			select: {
				id: true,
				user_id: true,
				nama: true,
			},
		});

		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		});
	}
};

