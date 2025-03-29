import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
    const salt = bcrypt.genSaltSync(10);

    prisma.user.createMany({
        data: [
            { name: 'admin', email: 'admin@mail.co', password: bcrypt.hashSync("admin", salt), role: 'ADMIN' },
            { name: 'user', email: 'user@mail.co', password: bcrypt.hashSync("user", salt), role: 'USER' },
        ]
    });    
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
