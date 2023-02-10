import { PrismaClient } from "@prisma/client";
import { toDate, toDateOnly } from "../libs/datetime";

const prisma = new PrismaClient();

export const getChatBalasRepository = async () => {
	try {
		return await prisma.$queryRaw`
            SELECT 
                id,
                pemesanan_id,
                nama,
                chat,
                created_at,
                user_type,
                status,
                no_pesan
            FROM (
                SELECT
                    chat.*,
                    pemesanan.no_pesan
                FROM
                    chat,
                    pemesanan
                WHERE
                    chat.pemesanan_id = pemesanan.id
                    AND chat.status IS NULL
                ORDER BY
                    pemesanan.id,
                    chat.created_at
            ) chat_pemesanan
            GROUP BY 
                id,
                pemesanan_id,
                nama,
                chat,
                created_at,
                user_type,
                status,
                no_pesan
		`;
	} catch (error) {
		throw error;
	}	
}