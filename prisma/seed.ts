import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const defaultUsers = await prisma.user.createMany({
        data: [
            { name: 'admin', email: 'admim@mail.co', password: 'admin', role: 'ADMIN' },
            { name: 'user', email: 'user@mail.co', password: 'user', role: 'USER' },
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
