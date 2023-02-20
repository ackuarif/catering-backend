import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTotalByPemesananId = async (pemesanan_id) => {
	try {
        if(!pemesanan_id){
            throw 'Maaf, pengisian formulir tidak lengkap.';
        }
		return await prisma.$queryRaw`
			SELECT
			ROUND(SUM((jumlah*harga)-((jumlah*harga)*(diskon::NUMERIC/100)))) AS total 
			FROM
				keranjang
			WHERE
				pemesanan_id = ${pemesanan_id}
		`;
	} catch (error) {
		throw error;
	}	
}