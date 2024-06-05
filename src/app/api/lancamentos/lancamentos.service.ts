import { LancamentoDto } from "@/app/dtos/lancamentos.dto";
import { prisma } from "../../../../lib/prisma";
import { MovimentacoesService } from "../movimentacoes/movimentacoes.service";

export class LancamentosService {
    async getLancamentos() {
        try {
            const lancamentos = await prisma.lancamentos_receita_despesa.findMany();
            return lancamentos;
        } catch (error) {
            throw new Error(String(error))
        }
    }

    async create(lancamento: LancamentoDto) {
        const { tipo } = lancamento;
        try {
            if (tipo.includes('D')) {
                return this.lancamentoDespesa(lancamento)
            } else {
                return this.lancamentoReceita(lancamento)
            }
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async lancamentoDespesa(lancamento: LancamentoDto) {
        const { valor, obs, recDesId, userId, empresaId, tipo, dataHora } = lancamento;
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
            debito: valor,
            descricao: `DES - ${despesa.nome}`,
            empresaId: empresa.id,
        })

        const diferenca = (parseFloat(despesa.valorEstimado.toString()) - valor);
        const lancamentos = await prisma.lancamentos_receita_despesa.create({
            data: {
                nome: despesa.nome,
                real: valor,
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

    async lancamentoReceita(lancamento: LancamentoDto) {
        const { valor, obs, recDesId, userId, empresaId, tipo, dataHora } = lancamento;
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
            credito: valor,
            debito: 0,
            descricao: `REC - ${receita.nome}`,
            empresaId: empresa.id
        })

        const diferenca = (parseFloat(receita.valorEstimado.toString()) - valor);
        const lancamentos = await prisma.lancamentos_receita_despesa.create({
            data: {
                nome: receita.nome,
                real: valor,
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
