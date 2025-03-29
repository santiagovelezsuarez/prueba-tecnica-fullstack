import { UserCredentials } from "@/lib/definitions";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function validateUserWithCredentials(credentials: UserCredentials) {
    const user = await prisma.user.findUnique({ where: { email: credentials.email } });

    if (!user) {
        throw new Error("Credenciales incorrectas");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(credentials.password, salt);

    const isValidPassword = bcrypt.compareSync(user.password!, hash)

    if (!isValidPassword) {
        throw new Error("Credenciales incorrectas");
    }

    return user;
}