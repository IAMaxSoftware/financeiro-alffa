import { formatarNumeroMoedaReal, formatarNumeroVigula } from "../functions/utils";
import { DespesaModel } from "../models/despesa_model";
import { DespesaModelTable } from "../models/despesa_model";

import api from "../services/api";

export class DespesaRepository {

    async create(despesa: DespesaModel, token: string): Promise<DespesaModel> {
        try {
            const { nome, valorEstimado, usuarioCriou, dataPrevisao, empresaId } = despesa;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await api.post('/despesas', {
                nome,
                valorEstimado,
                usuarioCriou,
                dataPrevisao,
                empresaId
            }, config)
            return response.data as DespesaModel;
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async delete(despesaId: number): Promise<boolean> {
        try {
            const response = await api.delete(`/despesas/${despesaId}`)
            return response.status === 200;
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getDespesas(token: string): Promise<DespesaModel[]> {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await api.get('/despesas', config)
            return response.data as DespesaModel[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getDespesa(token: string, nome: string, empresaId: number): Promise<DespesaModel> {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    nome: nome,
                    empresaId: empresaId
                }
            };
            const response = await api.get('/despesas', config)
            return response.data as DespesaModel;
        } catch (error) {
            throw new Error(String(Error));
        }
    }


    async getDespesasValorFormatado(token: string): Promise<DespesaModelTable[]> {
        let retorno: DespesaModelTable[] = [];
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await api.get('/despesas', config)


            response.data.forEach((value: DespesaModel) => {
                retorno.push({
                    id: value.id,
                    nome: value.nome,
                    valorEstimado: formatarNumeroMoedaReal(value.valorEstimado),
                    usuarioCriou: value.usuarioCriou,
                    dataPrevisao: value.dataPrevisao,
                })

            });
            return retorno;

        } catch (error) {
            throw new Error(String(Error));
        }
    }
}