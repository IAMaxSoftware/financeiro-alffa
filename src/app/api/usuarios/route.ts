import * as bcrypt from 'bcrypt';
import { prisma } from '../../../lib/prisma';


export async function POST(request: Request) {
    const roundsOfHashing = 10
    const { email, nome, senha, admin } = await request.json();
    const hashedPassword = await bcrypt.hash(
        senha,
        roundsOfHashing,
    );
    try {
        const usuario = await prisma.usuarios.create({
            data: {
                nome: nome.toUpperCase(),
                email,
                senha: hashedPassword,
                admin
            }
        });
        console.log(usuario)
        return Response.json(usuario);
    } catch (error) {
        throw new Error(String(error));
    }
}