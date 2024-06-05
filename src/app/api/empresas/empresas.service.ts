import { EmpresaDto } from "@/app/dtos/empresa.dto";
import { prisma } from "../../../../lib/prisma";

export class EmpresaService {
    async getEmpresas() {
        try {
            const empresas = prisma.empresas.findMany();
            return empresas;
        } catch (error) {
            throw new Error(String(error))
        }
    }

    async create(body: EmpresaDto) {
        try {
            const empresa = prisma.empresas.create({
                data: {
                    nome: body.nome.toUpperCase()
                }
            });
            return empresa;
        } catch (error) {
            throw new Error(String(error))
        }
    }
}