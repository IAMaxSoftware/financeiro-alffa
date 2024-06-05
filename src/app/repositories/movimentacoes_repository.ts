import { MovimentacoesModel } from "../models/movimentacoes_model";
import api from "../services/api";

export class MovimentacoesRepository {
    async getMovimentacoes(): Promise<MovimentacoesModel[]> {
        try {
            const response = await api.get('/movimentacoes')
            return response.data as MovimentacoesModel[];
        } catch (error) {
            throw new Error(String(Error));
        }
    }
}