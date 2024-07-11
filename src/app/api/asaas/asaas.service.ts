import { LancamentoDto, LancamentoQuery } from "@/app/api/dtos/lancamentos.dto";
import { MovimentacoesService } from "../movimentacoes/movimentacoes.service";
import { getIdByEmail } from "../lib/getIdByEmail";
import prisma from "@/services/database";
import { AsaasDto } from "../dtos/asaas.dto";
import { LancamentosService } from "../lancamentos/lancamentos.service";
import { ReceitasService } from "../receitas/receitas.service";
import { equal } from "assert";

export class AsaasService {

    

    async create(asaas: AsaasDto) {

        try {
            const receita = await receitaOutros(1);
            const lancamentoService = new LancamentosService();
            const lancamentoDto: LancamentoDto = {
                dataHora: new Date(),
                empresaId:1,
                real: asaas.value,
                recDesId: receita ? receita.id??0 : 0,
                tipo:"R",
                userEmail:''
            };
           return lancamentoService.create(lancamentoDto);
           
        } catch (error) {
            throw new Error(String(error));
        }
    }

}

async function receitaOutros(empresaId:number) {
    const receitas = await prisma.receitas.findUnique({
        where: {
            empresaId: parseInt(empresaId.toString()),
            nome: {
                equal: 'OUTROS'
            }
        }
    })
    return receitas;
}