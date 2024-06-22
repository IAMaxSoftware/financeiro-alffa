import { formatarNumeroMoedaReal } from "../functions/utils";
import { ReceitaModel, ReceitaModelTable } from "../models/receita_model";
import { api } from "../services/api";

export class ReceitaRepository {

    async create(receita: ReceitaModel): Promise<ReceitaModel> {

        const { nome, valorEstimado, emailUsuario, dataPrevisao, empresaId } = receita;
        try {
            const response = await api.post('/receitas', {
                nome,
                valorEstimado,
                emailUsuario,
                dataPrevisao,
                empresaId
            })
            return response.data as ReceitaModel;
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async delete(ReceitaId: number): Promise<boolean> {
        try {
            const response = await api.delete(`/receitas/${ReceitaId}`)
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
                    dataPrevisao: value.dataPrevisao,
                })

            });
            return retorno;
        } catch (error) {
            throw new Error(String(Error));
        }
    }
    async getReceitaById(id:number): Promise<ReceitaModel> {
        try {
            const config = {
                params: {
                    id
                }
            };
            const response = await api.get('/receitas', config)
            if(Array.isArray(response.data))
            {
                return response.data[0] as ReceitaModel;
            }
            return response.data as ReceitaModel;
        } catch (error) {
            throw new Error(String(Error));
        }
    }


    async getReceitasByNomeFormatado(nome: string, empresaId: number): Promise<ReceitaModelTable[]> {
        let retorno: ReceitaModelTable[] = [];
        try {
            const config = {
                params: {
                    nome: nome,
                    empresaId: empresaId,
                    max:5
                }
            };
            const response = await api.get('/receitas', config)

            if(!Array.isArray(response.data))
            {
                let aux = response.data as ReceitaModelTable;
                aux.valorEstimado = formatarNumeroMoedaReal(response.data.valorEstimado);
                return [aux] as ReceitaModelTable[];
            }

            response.data.forEach((value: ReceitaModel) => {
                retorno.push({
                    id: value.id,
                    nome: value.nome,
                    valorEstimado: formatarNumeroMoedaReal(value.valorEstimado),
                    dataPrevisao: value.dataPrevisao,
                })

            });
            return retorno as ReceitaModelTable[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getReceitaValorFormatado(empresaId: number): Promise<ReceitaModelTable[]> {
        let retorno: ReceitaModelTable[] = [];
        try {
            let response;
            if (empresaId > 0) {
                response = await api.get(`/receitas?empresaId=${empresaId}`)
            } else {
                response = await api.get(`/receitas`)
            }


            response.data.forEach((value: ReceitaModel) => {
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