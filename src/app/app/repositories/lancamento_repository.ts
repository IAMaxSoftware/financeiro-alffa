

import { LancamentoModel, LancamentoTableModel } from "../models/lancamento_model";
import { formatarNumeroMoedaReal } from "../functions/utils";
import { api } from "../services/api";

export class LancamentoRepository {

    async create(lancamento: LancamentoModel): Promise<LancamentoModel> {

        try {
            const { id, obs, recDesId, userEmail, empresaId, tipo, dataHora, real } = lancamento;
            const response = await api.post('/lancamentos', {
                id,
                obs,
                recDesId,
                userEmail,
                empresaId,
                tipo,
                dataHora,
                real
            })
            return response.data as LancamentoModel;
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async delete(lancamentoId: number): Promise<boolean> {
        try {
            const response = await api.delete(`/lancamentos?id=${lancamentoId}`)
            return response.status === 200;
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async getLancamentos(): Promise<LancamentoModel[]> {
        try {
            const response = await api.get('/lancamentos')
            return response.data as LancamentoModel[];
        } catch (error) {
            throw new Error(String(error));
        }
    }


    async getLancamentosValorFormatado(empresaId: number): Promise<LancamentoTableModel[]> {
        let retorno: LancamentoTableModel[] = [];
        try {
            let response;
            if (empresaId > 0) {
                response = await api.get(`/lancamentos?empresaId=${empresaId}`)
            } else {
                response = await api.get(`/lancamentos`)
            }


            response.data.forEach((value: LancamentoModel) => {
                retorno.push({
                    id: value.id,
                    obs: value.obs,
                    real: formatarNumeroMoedaReal(value.real),
                    recDesId: value.recDesId,
                    empresaId: value.empresaId,
                    tipo: value.tipo,
                    userEmail: value.userEmail,
                    dataHora: value.dataHora,
                })

            });
            return retorno;

        } catch (error) {
            throw new Error(String(error));
        }
    }
}