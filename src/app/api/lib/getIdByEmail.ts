import { prisma } from "@/lib/prisma";

export async function getIdByEmail(email: string): Promise<number> {
    const usuario = await prisma.usuarios.findFirst({
        where: {
            email
        }
    })

    return usuario?.id ?? 1;
}