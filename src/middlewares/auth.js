import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const pelangganIsAuthenticated = async (req, res, next) => {
	try {
		const { token } = req.cookies;

		if (!token) {
			return res.status(400).json({
				success: false,
				message: "Please login to access the data"
			});
		}

		const verify = jwt.verify(token, process.env.SECRET_KEY);
		req.user = await prisma.pelanggan.findFirst({ where: { user_id: verify.user_id } });
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

export const adminIsAuthenticated = async (req, res, next) => {
	try {
		const { token } = req.cookies;

		if (!token) {
			return res.status(400).json({
				success: false,
				message: "Please login to access the data"
			});
		}

		const verify = jwt.verify(token, process.env.SECRET_KEY);
		req.user = await prisma.admin.findFirst({ where: { user_id: verify.user_id } });
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
};

