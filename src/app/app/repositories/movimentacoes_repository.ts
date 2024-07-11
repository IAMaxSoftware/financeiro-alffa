import { MovimentacoesModel } from "../models/movimentacoes_model";
import {api} from "../services/api";

export class MovimentacoesRepository {
    async getMovimentacoes(empresaId:number|undefined): Promise<MovimentacoesModel[]> {
        try {
            const response = await api.get('/movimentacoes')
            return response.data as MovimentacoesModel[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }

    async getMovimentacoesBetween(dataInicial:Date, dataFinal:Date, empresaId:number | undefined): Promise<MovimentacoesModel[]> {
        dataInicial.setHours(0,0,0,0);
        dataFinal.setHours(23,59,0,0)
        
        try {
            let parametros:any;
            if(empresaId)
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