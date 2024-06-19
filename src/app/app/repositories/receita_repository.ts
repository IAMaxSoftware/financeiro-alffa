import { formatarNumeroMoedaReal } from "../functions/utils";
import { ReceitaModel, ReceitaModelTable } from "../models/receita_model";
import {api} from "../services/api";

export class ReceitaRepository {

    async create(receita: ReceitaModel): Promise<ReceitaModel> {

        const { nome, valorEstimado, usuarioCriou, dataPrevisao, empresaId } = receita;
        try {
            const response = await api.post('/receitas', {
                nome,
                valorEstimado,
                usuarioCriou,
                dataPrevisao,
                empresaId
            })
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

    async getReceitas(): Promise<ReceitaModel[]> {
        try {
            const response = await api.get('/receitas')
            return response.data as ReceitaModel[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getReceitasPorNome(nome: string, empresaId: number): Promise<ReceitaModelTable[]> {
        let retorno: ReceitaModelTable[] = [];
        try {
            const config = {
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

    async getReceitaValorFormatado(): Promise<ReceitaModelTable[]> {
        let retorno: ReceitaModelTable[] = [];
        try {
            const response = await api.get('/receitas')


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