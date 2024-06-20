import { EmpresaModel } from "./empresa_model";

export interface DespesaModel {
    id?: number;
    nome: string;
    valorEstimado: number;
    emailUsuario?: string;
    dataPrevisao: number;
    empresaId?: number;
    empresa?: EmpresaModel;
}

export interface DespesaModelTable {
    id?: number;
    nome: string;
    valorEstimado: string;
    usuarioCriou?: number;
    dataPrevisao: number;
}

