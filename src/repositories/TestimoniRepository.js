import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAvgRatingByMenuIdRepository = async (menu_id) => {
	try {
		const getDatas = await prisma.$queryRaw`
            SELECT
                ROUND(SUM(rating::DECIMAL)/COUNT(rating),2) as rating
            FROM
                testimoni
            WHERE
                menu_id = ${menu_id}
		`;

		return getDatas;
	} catch (error) {
		throw error;
	}	
}