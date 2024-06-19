import { DespesaDto, DespesaQuery } from "@/app/app/dtos/despesa.dto";
import { prisma } from "../../../lib/prisma";

export class DespesasService {
    async getDespesas(despesaQuery: DespesaQuery) {
        const { nome, empresaId } = despesaQuery;
        try {
            if (nome && !empresaId) {
                // const despesas = await this.prisma.$queryRaw<Despesas[]>`SELECT * FROM DESPESAS WHERE nome like '%${nome}%'`;
                const despesas = await prisma.despesas.findMany({
                    where: {
                        nome: {
                            contains: nome.toUpperCase()
                        }
                    }
                })
                return despesas;
            }
            if (empresaId && !nome) {
                const despesas = await prisma.despesas.findMany({
                    where: {
                        empresaId: parseInt(empresaId.toString())
                    }
                })
                return despesas;
            }

            if (empresaId && nome) {
                const despesas = await prisma.despesas.findMany({
                    where: {
                        empresaId: parseInt(empresaId.toString()),
                        nome: {
                            contains: nome.toUpperCase()
                        }
                    }
                })
                return despesas;
            }
            const despesas = await prisma.despesas.findMany()
            return despesas;
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async getById(id: number) {
        try {
            const despesa = await prisma.despesas.findUnique({
                where: {
                    id
                }
            })
            return despesa;
        } catch (error) {
            throw new Error(String(error))
        }
    }

    async create(despesa: DespesaDto) {
        const { nome, valorEstimado, usuarioCriou, dataPrevisao, empresaId } = despesa;
        try {
            const despesa = await prisma.despesas.create({
                data: {
                    nome: nome.toUpperCase(),
                    valorEstimado,
                    usuarioCriou,
                    dataPrevisao,
                    empresaId
                }
            });

            return despesa;
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async update(id: number, despesa: DespesaDto) {
        try {
            const despesaOld = await prisma.despesas.findUnique({
                where: {
                    id
                }
            })
            const despesaUpdated = await prisma.despesas.update({
                where: { id },
                data: {
                    dataPrevisao: despesa.dataPrevisao,
                    empresaId: despesa.empresaId,
                    nome: despesa.nome.toUpperCase(),
                    valorEstimado: despesa.valorEstimado,
                }
            })
            return despesaUpdated;
        } catch (error) {
            throw new Error(String(error))
        }
    }

    async delete(id: number) {
        try {
            const despesa = await prisma.despesas.delete({
                where: {
                    id
                }
            });
            return ''
        } catch (error) {
            throw new Error(String(error));
        }
    }
}
