import { MovimentacoesDto, MovimentacoesQuery } from "@/app/dtos/movimentacoes.dto";
import { prisma } from "../../../../lib/prisma";

export class MovimentacoesService {
    async insert(mov: MovimentacoesDto) {
        const { descricao, credito, debito, dataHora, empresaId } = mov;
        try {
            const movimento = prisma.movimentacoes.create({
                data: {
                    descricao: descricao.toUpperCase(),
                    credito,
                    debito,
                    dataHora,
                    empresaId
                }
            })
            return movimento;
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async getMovimentacoes(movimentacoesQuery: MovimentacoesQuery) {
        const { empresaId, dataInicial, dataFinal } = movimentacoesQuery;

        try {
            if (empresaId && !dataInicial && !dataFinal) {
                const movimentacoes = prisma.movimentacoes.findMany({
                    where: {
                        empresaId: parseInt(empresaId.toString()),
                    }
                });
                return movimentacoes;
            }
            if (!empresaId && dataInicial && dataFinal) {
                const movimentacoes = prisma.movimentacoes.findMany({
                    where: {
                        dataHora: {
                            gte: new Date(dataInicial),
                            lt: new Date(dataFinal),
                        }
                    }
                });
                return movimentacoes;
            }
            if (empresaId && dataInicial && dataFinal) {
                const movimentacoes = prisma.movimentacoes.findMany({
                    where: {
                        empresaId: parseInt(empresaId.toString()),
                        dataHora: {
                            gte: new Date(dataInicial),
                            lt: new Date(dataFinal),
                        }
                    }
                });
                return movimentacoes;
            }
            const movimentacoes = prisma.movimentacoes.findMany();
            return movimentacoes;
        } catch (error) {
            throw new Error(String(error));
        }
    }
}
