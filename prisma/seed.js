import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash('admin', salt);

    await prisma.admin.createMany({
        data: [
            {
                nama: 'Admin',
                user_id: 'admin',
                password: hashPassword,
            }
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