import { UserCredentials } from "@/lib/definitions";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function validateUserWithCredentials(credentials: UserCredentials) {
    const user = await prisma.user.findUnique({ where: { email: credentials.email } });

    if (!user) {
        throw new Error("Credenciales incorrectas");
    }    

    const isValidPassword = bcrypt.compareSync(credentials.password, user.password!);

    if (!isValidPassword) {
        throw new Error("Credenciales incorrectas");
    }

    return user;
}