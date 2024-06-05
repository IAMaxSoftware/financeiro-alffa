import { ReceitaDto, ReceitaQuery } from "@/app/dtos/receita.dto";
import { prisma } from "../../../../lib/prisma";

export class ReceitasService {
    async getReceitas(receitaQuery: ReceitaQuery) {
        const { nome, empresaId } = receitaQuery;
        try {
            if (nome && !empresaId) {
                // const receitas = await prisma.$queryRaw<receitas[]>`SELECT * FROM receitaS WHERE nome like '%${nome}%'`;
                const receitas = await prisma.receitas.findMany({
                    where: {
                        nome: {
                            contains: nome.toUpperCase()
                        }
                    }
                })
                return receitas;
            }
            if (empresaId && !nome) {
                const receitas = await prisma.receitas.findMany({
                    where: {
                        empresaId: parseInt(empresaId.toString())
                    }
                })
                return receitas;
            }

            if (empresaId && nome) {
                const receitas = await prisma.receitas.findMany({
                    where: {
                        empresaId: parseInt(empresaId.toString()),
                        nome: {
                            contains: nome.toUpperCase()
                        }
                    }
                })
                return receitas;
            }
            const receitas = await prisma.receitas.findMany()
            return receitas;
        } catch (error) {
            throw new Error(String(error))
        }
    }

    async getById(id: number) {
        try {
            const receita = await prisma.receitas.findUnique({
                where: {
                    id
                }
            })
            return receita;
        } catch (error) {
            throw new Error(String(error))
        }
    }

    async createReceita(receita: ReceitaDto) {
        const { nome, usuarioCriou, valorEstimado, dataPrevisao, empresaId } = receita;
        try {
            const receita = prisma.receitas.create({
                data: {
                    nome: nome.toUpperCase(),
                    usuarioCriou,
                    valorEstimado,
                    empresaId
                }
            });
            return receita;
        } catch (error) {
            throw new Error(String(error))
        }
    }

    async update(id: number, receita: ReceitaDto) {
        try {
            const receitaOld = await prisma.despesas.findUnique({
                where: {
                    id
                }
            })
            const receitaUpdated = await prisma.receitas.update({
                where: { id },
                data: {
                    dataPrevisao: receita.dataPrevisao,
                    empresaId: receita.empresaId,
                    nome: receita.nome.toUpperCase(),
                    valorEstimado: receita.valorEstimado,
                }
            })
            return receitaUpdated;
        } catch (error) {
            throw new Error(String(error))
        }
    }

    async delete(id: number) {
        try {
            const receita = await prisma.receitas.delete({
                where: {
                    id
                }
            });

            return receita;
        } catch (error) {
            throw new Error(String(error));
        }
    }
}
