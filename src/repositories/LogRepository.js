import { PrismaClient } from "@prisma/client";
import { toDate, toDateOnly } from "../libs/datetime";

const prisma = new PrismaClient();

export const getLogTodayRepository = async () => {
	try {
		return await prisma.$queryRaw`
            SELECT
                ROUND(COUNT(id)) AS jml
            FROM
                logs
            WHERE
                created_at::DATE = NOW()::DATE
		`;
	} catch (error) {
		throw error;
	}
}