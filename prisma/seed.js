import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash('admin', salt);

    const createAdmin = await prisma.admin.createMany({
      data: [
          {
              nama: 'Admin',
              user_id: 'admin',
              password: hashPassword,
          }
      ],
      skipDuplicates: true,
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
      skipDuplicates: true,
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