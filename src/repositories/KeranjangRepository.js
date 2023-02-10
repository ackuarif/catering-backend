import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTotalByPemesananId = async (pemesanan_id) => {
	try {
        if(!pemesanan_id){
            throw 'Maaf, parameter tidak lengkap.';
        }
		return await prisma.$queryRaw`
			SELECT
				ROUND(SUM((jumlah*harga)*((diskon/100)+1))) AS total 
			FROM
				keranjang
			WHERE
				pemesanan_id = ${pemesanan_id}
		`;
	} catch (error) {
		throw error;
	}	
}