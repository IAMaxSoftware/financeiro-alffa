import * as bcrypt from 'bcrypt';
import { prisma } from '../../../../lib/prisma';

export class AuthService {
    async login(email: string, password: string) {
        const user = await prisma.usuarios.findFirst({ where: { email: email } });

        if (!user) {
            throw new Error(`No user found for email: ${email}`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.senha!);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return user;
    }
}