

import { LancamentoModel, LancamentoTableModel } from "../models/lancamento_model";
import { formatarNumeroMoedaReal } from "../functions/utils";
import {api} from "../services/api";

export class LancamentoRepository {

    async create(lancamento: LancamentoModel, token: string): Promise<LancamentoModel> {

        try {
            const { id, obs, recDesId, userId, empresaId, tipo, dataHora, valor } = lancamento;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await api.post('/lancamentos', {
                id,
                obs,
                recDesId,
                userId,
                empresaId,
                tipo,
                dataHora,
                valor
            }, config)
            return response.data as LancamentoModel;
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async delete(lancamentoId: number, token: string): Promise<boolean> {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await api.delete(`/lancamentos/${lancamentoId}`, config)
            return response.status === 200;
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getLancamentos(token: string): Promise<LancamentoModel[]> {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await api.get('/lancamentos', config)
            return response.data as LancamentoModel[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }


    async getDespesasValorFormatado(token: string): Promise<LancamentoTableModel[]> {
        let retorno: LancamentoTableModel[] = [];
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await api.get('/despesas', config)


            response.data.forEach((value: LancamentoModel) => {
                retorno.push({
                    id: value.id,
                    obs: value.obs,
                    valor: formatarNumeroMoedaReal(value.valor),
                    recDesId: value.recDesId,
                    empresaId: value.empresaId,
                    tipo: value.tipo,
                    userId: value.userId,
                    dataHora: value.dataHora,
                })

            });
            return retorno;

        } catch (error) {
            throw new Error(String(Error));
        }
    }
}