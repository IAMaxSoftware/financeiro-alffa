import { DespesaDto, DespesaQuery } from "@/app/api/dtos/despesa.dto";
import { getIdByEmail } from "../lib/getIdByEmail";
import prisma from "@/services/database";

export class DespesasService {
    async getDespesas(despesaQuery: DespesaQuery) {
        const { nome, empresaId, max, id, dataInicial, dataFinal } = despesaQuery;
        const maxDefault = 100
        try {
            //console.log(`Nome: ${nome}, Empresa ID: ${empresaId}, Max: ${max}, ID: ${id}`);
            if (id) {
                const despesa = await prisma.despesas.findMany({
                    where: {
                        id: parseInt(id)
                    }
                })
                return despesa;

            }

            if (nome && !empresaId && !dataInicial && !dataFinal) {
                // const despesas = await this.prisma.$queryRaw<Despesas[]>`SELECT * FROM DESPESAS WHERE nome like '%${nome}%'`;
                const despesas = await prisma.despesas.findMany({
                    take: max ? parseInt(max) : maxDefault,
                    where: {
                        nome: {
                            contains: nome.toUpperCase()
                        }
                    }
                })
                return despesas;
            }
            if (empresaId && !nome && !dataInicial && !dataFinal) {
                const despesas = await prisma.despesas.findMany({
                    take: max ? parseInt(max) : maxDefault,
                    where: {
                        empresaId: parseInt(empresaId.toString())
                    }
                })
                return despesas;
            }

            if (!empresaId && dataInicial && dataFinal) {
                const despesas = await prisma.despesas.findMany({
                    take: max ? parseInt(max) : maxDefault,
                    where: {
                        dataPrevisao: {
                            gte: dataInicial.getDate(),
                            lte: dataFinal.getDate()
                        }
                    }
                })
                return despesas;
            }


            if (empresaId && dataInicial && dataFinal) {
                const despesas = await prisma.despesas.findMany({
                    take: max ? parseInt(max) : maxDefault,
                    where: {
                        empresaId: parseInt(empresaId.toString()),
                        dataPrevisao: {
                            gte: dataInicial.getDate(),
                            lte: dataFinal.getDate()
                        }
                    }
                })
                return despesas;
            }


            if (empresaId && nome) {
                const despesas = await prisma.despesas.findMany({
                    take: max ? parseInt(max) : maxDefault,
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

        const { nome, valorEstimado, dataPrevisao, empresaId, emailUsuario } = despesa;
        try {
            const usuarioCriou = await getIdByEmail(emailUsuario);
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
