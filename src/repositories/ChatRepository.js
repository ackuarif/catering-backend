import { PrismaClient } from "@prisma/client";
import moment from "moment/moment";
import { toDate, toDateOnly } from "../libs/datetime";

const prisma = new PrismaClient();

export const getChatBalasRepository = async () => {
	try {
		const getDatas = await prisma.$queryRaw`
            SELECT 
                *
            FROM (
                SELECT
                    distinct on (chat.pemesanan_id) chat.pemesanan_id,
                    chat.*,
                    pemesanan.no_pesan
                FROM
                    chat,
                    pemesanan
                WHERE
                    chat.pemesanan_id = pemesanan.id
                    AND chat.status IS NULL
                ORDER BY
                    chat.pemesanan_id desc,
                    chat.created_at desc
            ) chat_pemesanan order by created_at desc
		`;

        getDatas.map((data) => {
			data.created_at = moment(data.created_at).format("YYYY-MM-DD HH:mm:ss")
		})

		return getDatas;
	} catch (error) {
		throw error;
	}	
}