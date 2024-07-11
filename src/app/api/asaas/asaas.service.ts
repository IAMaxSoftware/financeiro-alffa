import { LancamentoDto, LancamentoQuery } from "@/app/api/dtos/lancamentos.dto";
import { MovimentacoesService } from "../movimentacoes/movimentacoes.service";
import { getIdByEmail } from "../lib/getIdByEmail";
import prisma from "@/services/database";
import { AsaasDto } from "../dtos/asaas.dto";

export class AsaasService {

    async create(asaas: AsaasDto) {

        try {
            console.log(asaas);
            return asaas;
        } catch (error) {
            throw new Error(String(error));
        }
    }

}
