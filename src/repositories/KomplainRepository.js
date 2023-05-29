import { PrismaClient } from "@prisma/client";
import moment from "moment/moment";
import { toDate, toDateOnly } from "../libs/datetime";

const prisma = new PrismaClient();

export const getKomplainBalasRepository = async () => {
	try {
		const getDatas = await prisma.$queryRaw`
            SELECT * FROM (
                SELECT
                    distinct on (user_id) user_id,
                    komplain.*
                FROM
                    komplain
                WHERE
                    status IS NULL
                ORDER BY
                    user_id desc, created_at desc 
            ) as vKomplain order by created_at asc
		`;

        getDatas.map((data) => {
			data.created_at = moment(data.created_at).format("YYYY-MM-DD HH:mm:ss")
		})

		return getDatas;
	} catch (error) {
		throw error;
	}	
}