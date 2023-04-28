import { PrismaClient } from "@prisma/client";
import { getMonth } from "../libs/datetime";

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

export const getJmlKunjunganPerMonthRepository = async () => {
	try {
		const getDatas = await prisma.$queryRaw`
			SELECT
				TO_CHAR(created_at, 'MM') bulan,
				ROUND(COUNT(id)) jml
			FROM
				logs
			WHERE
				TO_CHAR(created_at, 'YYYY') = TO_CHAR(NOW(), 'YYYY')
			GROUP BY
				TO_CHAR(created_at, 'MM')
		`;

		getDatas.map((data) => {
			data.bulan = getMonth(data.bulan)
		})

		return getDatas;
	} catch (error) {
		throw error;
	}	
}