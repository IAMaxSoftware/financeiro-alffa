import { formatarNumeroMoedaReal } from "../functions/utils";
import { ReceitaModel, ReceitaModelTable } from "../models/receita_model";
import {api} from "../services/api";

export class ReceitaRepository {

    async create(receita: ReceitaModel, token: string): Promise<ReceitaModel> {

        const { nome, valorEstimado, usuarioCriou, dataPrevisao, empresaId } = receita;
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await api.post('/receitas', {
                nome,
                valorEstimado,
                usuarioCriou,
                dataPrevisao,
                empresaId
            }, config)
            return response.data as ReceitaModel;
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async delete(despesaId: number): Promise<boolean> {
        try {
            const response = await api.delete(`/receitas/${despesaId}`)
            console.log(response.status);
            return response.status === 204;
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getReceitas(token: string): Promise<ReceitaModel[]> {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await api.get('/receitas', config)
            return response.data as ReceitaModel[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getReceitasPorNome(token: string, nome: string, empresaId: number): Promise<ReceitaModelTable[]> {
        let retorno: ReceitaModelTable[] = [];
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    nome: nome,
                    empresaId: empresaId
                }
            };
            const response = await api.get('/receitas', config)
            response.data.forEach((value: ReceitaModel) => {
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

    async getReceitaValorFormatado(token: string): Promise<ReceitaModelTable[]> {
        let retorno: ReceitaModelTable[] = [];
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await api.get('/receitas', config)


            response.data.forEach((value: ReceitaModel) => {
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