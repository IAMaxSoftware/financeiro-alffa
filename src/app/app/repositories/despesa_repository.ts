import { formatarNumeroMoedaReal, formatarNumeroVigula } from "../functions/utils";
import { DespesaModel } from "../models/despesa_model";
import { DespesaModelTable } from "../models/despesa_model";

import { api } from "../services/api";


export class DespesaRepository {

    async create(despesa: DespesaModel): Promise<DespesaModel> {
        try {
            const { id, nome, valorEstimado, dataPrevisao, empresaId } = despesa;
            let response: any = null;
            if (id) {
                response = await api.put(`/despesas/${id}`, {
                    nome,
                    valorEstimado,
                    dataPrevisao,
                    empresaId
                })
            } else {
                response = await api.post(`/despesas`, {
                    nome,
                    valorEstimado,
                    dataPrevisao,
                    empresaId
                })
            }
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


    async getDespesaById(id: number): Promise<DespesaModel> {
        try {
            const config = {
                params: {
                    id
                }
            };
            const response = await api.get('/despesas', config)
            if (Array.isArray(response.data)) {
                return response.data[0] as DespesaModel;
            }
            return response.data as DespesaModel;
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

    async getDespesasByNomeFormatado(nome: string, empresaId: number | undefined): Promise<DespesaModelTable[]> {
        let retorno: DespesaModelTable[] = [];
        const maximo = 5;
        try {
            const config = {
                params: empresaId ? {
                    nome: nome,
                    empresaId: empresaId,
                    max: maximo
                } :
                    {
                        nome: nome,
                        max: maximo
                    }
            };
            const response = await api.get('/despesas', config)

            if (!Array.isArray(response.data)) {
                let aux = response.data as DespesaModelTable;
                aux.valorEstimado = formatarNumeroMoedaReal(response.data.valorEstimado);
                return [aux] as DespesaModelTable[];
            }

            response.data.forEach((value: DespesaModel) => {
                retorno.push({
                    id: value.id,
                    nome: value.nome,
                    valorEstimado: formatarNumeroMoedaReal(value.valorEstimado),
                    dataPrevisao: value.dataPrevisao,
                })

            });
            return retorno as DespesaModelTable[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getDespesasValorFormatadoBetween(dataInicial: Date, dataFinal: Date, empresaId: number): Promise<DespesaModelTable[]> {
        let retorno: DespesaModelTable[] = [];
        const url = empresaId > 0 ? `/despesas?empresaId=${empresaId}` : `/despesas`;
        const parametros = {
            dataInicial: dataInicial,
            dataFinal: dataFinal,
        }
        try {

            const response = await api.get(url, {
                params: parametros
            });

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