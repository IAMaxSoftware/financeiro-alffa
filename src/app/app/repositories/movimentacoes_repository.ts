import { MovimentacoesModel } from "../models/movimentacoes_model";
import {api} from "../services/api";

export class MovimentacoesRepository {
    async getMovimentacoes(empresaId:number): Promise<MovimentacoesModel[]> {
        const url = empresaId > 0 ? `/movimentacoes?empresaId=${empresaId}` : '/movimentacoes'
        try {
            const response = await api.get(url)
            return response.data as MovimentacoesModel[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getMovimentacoesBetween(dataInicial:Date, dataFinal:Date, empresaId:number): Promise<MovimentacoesModel[]> {
        dataInicial.setHours(0,0,0,0);
        dataFinal.setHours(23,59,0,0)
        console.log(empresaId);
        try {
            let parametros:any;
            if(empresaId>0)
            {
                parametros = {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal,
                    empresaId: empresaId
                }
            }
            else
            {
                parametros = {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal,
                }
            }
            const response = await api.get('/movimentacoes', {
                params: parametros
            });
            return response.data as MovimentacoesModel[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }
}