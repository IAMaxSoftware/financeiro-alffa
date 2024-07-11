import { LancamentoDto, LancamentoQuery } from "@/app/api/dtos/lancamentos.dto";
import { MovimentacoesService } from "../movimentacoes/movimentacoes.service";
import { getIdByEmail } from "../lib/getIdByEmail";
import prisma from "@/services/database";

export class AsaasService {

    async create(lancamento: any) {

        try {
            console.log(lancamento);
        } catch (error) {
            throw new Error(String(error));
        }
    }

}
