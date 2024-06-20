import { formatarNumeroMoedaReal, formatarNumeroVigula } from "../functions/utils";
import { DespesaModel } from "../models/despesa_model";
import { DespesaModelTable } from "../models/despesa_model";

import { api } from "../services/api";


export class DespesaRepository {

    async create(despesa: DespesaModel): Promise<DespesaModel> {
        try {
            const { nome, valorEstimado, dataPrevisao, empresaId } = despesa;
            const response = await api.post('/despesas', {
                nome,
                valorEstimado,
                dataPrevisao,
                empresaId
            })
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

    async getDespesas(): Promise<DespesaModel[]> {
        try {
            const response = await api.get('/despesas')
            return response.data as DespesaModel[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getDespesa(nome: string, empresaId: number): Promise<DespesaModel> {
        try {
            const config = {
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


    async getDespesasValorFormatado(empresaId: number): Promise<DespesaModelTable[]> {
        let retorno: DespesaModelTable[] = [];
        try {

            let response;
            if (empresaId > 0) {
                response = await api.get(`/despesas?empresaId=${empresaId}`)
            } else {
                response = await api.get(`/despesas`)
            }

            response.data.forEach((value: DespesaModel) => {
                retorno.push({
                    id: value.id,
                    nome: value.nome,
                    valorEstimado: formatarNumeroMoedaReal(value.valorEstimado),
                    dataPrevisao: value.dataPrevisao,
                })

            });
            return retorno;

        } catch (error) {
            throw new Error(String(Error));
        }
    }
}