import { EmpresaDto } from "@/app/api/dtos/empresa.dto";
import prisma from "@/services/database";


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

    async update(id: number, body: EmpresaDto) {
        try {
            const empresa = prisma.empresas.update({
                where: {
                    id: id
                },
                data: {
                    nome: body.nome.toUpperCase()
                }
            });
            console.log(empresa);
            return empresa;
        } catch (error) {
            throw new Error(String(error))
        }
    }

    async delete(id:number) {
        try {
            const empresas = prisma.empresas.delete({
                where: {
                    id: id
                }
            });
            return empresas;
        } catch (error) {
            throw new Error(String(error))
        }
    }
}