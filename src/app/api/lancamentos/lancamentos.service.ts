import { LancamentoDto, LancamentoQuery } from "@/app/api/dtos/lancamentos.dto";
import { MovimentacoesService } from "../movimentacoes/movimentacoes.service";
import { getIdByEmail } from "../lib/getIdByEmail";
import prisma from "@/services/database";

export class LancamentosService {
    async getLancamentos(query: LancamentoQuery) {
        const { nome, empresaId } = query;
        try {

            if (nome && !empresaId) {
                const lancamentos = await prisma.lancamentos_receita_despesa.findMany({
                    where: {
                        nome: {
                            contains: nome.toUpperCase()
                        },
                        dataCancelamento: null
                    }
                });
                return lancamentos;
            }
            if (empresaId && !nome) {
                const lancamentos = await prisma.lancamentos_receita_despesa.findMany({
                    where: {
                        empresaId: parseInt(empresaId.toString()),
                        dataCancelamento: null
                    }
                });
                return lancamentos;
            }

            if (empresaId && nome) {
                const lancamentos = await prisma.lancamentos_receita_despesa.findMany({
                    where: {
                        empresaId: parseInt(empresaId.toString()),
                        nome: {
                            contains: nome.toUpperCase()
                        },
                        dataCancelamento: null
                    }
                });
                return lancamentos;
            }
            if (!empresaId || empresaId === '0') {
                const lancamentos = await prisma.lancamentos_receita_despesa.findMany({
                    where: {
                        dataCancelamento: null
                    }
                });
                return lancamentos;
            }
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async create(lancamento: LancamentoDto) {
        const { tipo } = lancamento;
        try {
            if (tipo === 'D') {
                return this.lancamentoDespesa(lancamento)
            } else {
                return this.lancamentoReceita(lancamento)
            }
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async createAsaas(lancamento: LancamentoDto) {
        try {
            return this.lancamentoAsaas(lancamento)
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async delete(id: number) {
        try {
            const lanc = await prisma.lancamentos_receita_despesa.findUnique({
                where: {
                    id
                }
            })
            if (!lanc) {
                throw new Error('Lançamento não encontrado')
            }
            const lancamento = await prisma.lancamentos_receita_despesa.update({
                where: {
                    id
                },
                data: {
                    dataCancelamento: new Date()
                }
            })
            const movimentacoesService = new MovimentacoesService();
            await movimentacoesService.insert({
                dataHora: new Date(),
                credito: lancamento.tipo === 'D' ? parseFloat(lancamento.real.toString()) : 0,
                debito: lancamento.tipo === 'R' ? parseFloat(lancamento.real.toString()) : 0,
                descricao: `CANCELAMENTO - ${lancamento.nome}`,
                empresaId: lancamento.empresaId
            })
            return lancamento;
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async lancamentoDespesa(lancamento: LancamentoDto) {
        const { real, obs, recDesId, userEmail, empresaId, tipo, dataHora } = lancamento;
        const despesa = await prisma.despesas.findUnique({
            where: {
                id: recDesId
            }
        })

        if (!despesa) {
            throw new Error('Despesa não encontrada')
        }

        const empresa = await prisma.empresas.findUnique({
            where: {
                id: empresaId
            }
        })

        if (!empresa) {
            throw new Error('Empresa não encontrada')
        }
        const movimentacoesService = new MovimentacoesService();
        const movimentacao = await movimentacoesService.insert({
            dataHora,
            credito: 0,
            debito: real,
            descricao: `DES - ${obs}`,
            empresaId: empresa.id,
        })

        const diferenca = (parseFloat(despesa.valorEstimado.toString()) - real);
        const userId = await getIdByEmail(userEmail);
        const lancamentos = await prisma.lancamentos_receita_despesa.create({
            data: {
                nome: despesa.nome,
                real,
                obs,
                recDesId: despesa.id,
                estimado: despesa.valorEstimado,
                usuId: userId,
                diferenca,
                empresaId: empresa.id,
                tipo,
                movId: movimentacao.id
            }
        });
        return lancamentos;
    }

    async lancamentoAsaas(lancamento: LancamentoDto) {
        const { real, obs, recDesId, userEmail, empresaId, tipo, dataHora } = lancamento;
        const userId = await getIdByEmail(userEmail);
        const receita = await prisma.receitas.findUnique({
            where: {
                id: recDesId
            }
        })

        if (!receita) {
            throw new Error('receita não encontrada')
        }

        const empresa = await prisma.empresas.findUnique({
            where: {
                id: empresaId
            }
        })

        if (!empresa) {
            throw new Error('Empresa não encontrada')
        }

        const movimentacoesService = new MovimentacoesService();
        const movimentacao = await movimentacoesService.insert({
            dataHora,
            credito: real,
            debito: 0,
            descricao: `REC - ${lancamento.obs}`,
            empresaId: empresa.id
        })

        const diferenca = (parseFloat(receita.valorEstimado.toString()) - real);
        const lancamentos = await prisma.lancamentos_receita_despesa.create({
            data: {
                nome: receita.nome,
                real,
                obs,
                recDesId: receita.id,
                estimado: receita.valorEstimado,
                usuId: userId,
                diferenca,
                empresaId: empresa.id,
                tipo,
                movId: movimentacao.id
            }
        });
        return lancamentos;
    }

    async lancamentoReceita(lancamento: LancamentoDto) {
        const { real, obs, recDesId, userEmail, empresaId, tipo, dataHora } = lancamento;
        const userId = await getIdByEmail(userEmail);
        const receita = await prisma.receitas.findUnique({
            where: {
                id: recDesId
            }
        })

        if (!receita) {
            throw new Error('receita não encontrada')
        }

        const empresa = await prisma.empresas.findUnique({
            where: {
                id: empresaId
            }
        })

        if (!empresa) {
            throw new Error('Empresa não encontrada')
        }

        const movimentacoesService = new MovimentacoesService();
        const movimentacao = await movimentacoesService.insert({
            dataHora,
            credito: real,
            debito: 0,
            descricao: `REC - ${obs}`,
            empresaId: empresa.id
        })

        const diferenca = (parseFloat(receita.valorEstimado.toString()) - real);
        const lancamentos = await prisma.lancamentos_receita_despesa.create({
            data: {
                nome: receita.nome,
                real,
                obs,
                recDesId: receita.id,
                estimado: receita.valorEstimado,
                usuId: userId,
                diferenca,
                empresaId: empresa.id,
                tipo,
                movId: movimentacao.id
            }
        });
        return lancamentos;
    }
}
