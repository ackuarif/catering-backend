import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash('admin', salt);

		await prisma.setting.deleteMany({
			where: {
				NOT: {
					id: 0,
				},
			},
		});  

    await prisma.logs.deleteMany({
			where: {
				NOT: {
					id: 0,
				},
			},
		});  

    await prisma.chat.deleteMany({
			where: {
        NOT: {
					id: 0,
				},
			},
		});

    await prisma.pemesanan.deleteMany({
			where: {
        NOT: {
					id: 0,
				},
			},
		});

    await prisma.keranjang.deleteMany({
			where: {
        NOT: {
					id: 0,
				},
			},
		});

		await prisma.menu.deleteMany({
			where: {
        NOT: {
					id: 0,
				},
			},
		}); 

    await prisma.admin.deleteMany({
			where: {
        NOT: {
					id: 0,
				},
			},
		});
    
    await prisma.pelanggan.deleteMany({
			where: {
        NOT: {
					id: 0,
				},
			},
		});

    const createSetting = await prisma.setting.create({
      data: {
        info_pembayaran: '',
      },
    });

    const createAdmin = await prisma.admin.create({
      data: {
        nama: 'Admin',
        user_id: 'admin',
        password: hashPassword,
      },
    });

    await prisma.wilayah.deleteMany({
			where: {
        NOT: {
					id: 0,
				},
			},
		});    

    await prisma.menu.createMany({
      data: [
          {
              admin_id: createAdmin.id,
              nama: 'Nasi Kuning',
              harga: 20000,
              diskon: 10,
              gambar: 'https://res.cloudinary.com/dolbbve7o/image/upload/v1679503015/nasikuning_iatxlz.jpg',
              detail: 'Nasi kuning adalah makanan khas Indonesia. Makanan ini terbuat dari beras yang dimasak bersama dengan kunyit serta santan dan rempah-rempah. Dengan ditambahkannya bumbu-bumbu dan santan, nasi kuning memiliki rasa yang lebih gurih daripada nasi putih.',
          },
          {
              admin_id: createAdmin.id,
              nama: 'Nasi Jagung',
              harga: 15000,
              diskon: 0,
              gambar: 'https://res.cloudinary.com/dolbbve7o/image/upload/v1679503015/nasijagung_oi9cq6.jpg',
              detail: 'Nasi jagung adalah suatu makanan khas Indonesia yang terbuat dari jagung sebagai bahan dasarnya. Jagung yang digunakan dalam membuat nasi jagung adalah jagung yang sudah tua atau dikenal dengan istilah jagung pipil.',
          },
      ],
    });  

    await prisma.wilayah.createMany({
      data: [
        { nama: 'SUKAPURA',},
        { nama: 'SUMBER',},
        { nama: 'KURIPAN',},
        { nama: 'BANTARAN',},
        { nama: 'LECES',},
        { nama: 'TEGALSIWALAN',},
        { nama: 'BANYUANYAR',},
        { nama: 'TIRIS',},
        { nama: 'KRUCIL',},
        { nama: 'GADING',},
        { nama: 'PAKUNIRAN',},
        { nama: 'KOTAANYAR',},
        { nama: 'PAITON',},
        { nama: 'BESUK',},
        { nama: 'KRAKSAAN',},
        { nama: 'KREJENGAN',},
        { nama: 'PAJARAKAN',},
        { nama: 'MARON',},
        { nama: 'GENDING',},
        { nama: 'DRINGU',},
        { nama: 'WONOMERTO',},
        { nama: 'LUMBANG',},
        { nama: 'TONGAS',},
        { nama: 'SUMBERASIH',},
        { nama: 'KADEMANGAN',},
        { nama: 'KEDOPOK',},
        { nama: 'WONOASIH',},
        { nama: 'MAYANGAN',},
        { nama: 'KANIGARAN',},
      ],
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });