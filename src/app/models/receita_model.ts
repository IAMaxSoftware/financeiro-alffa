import { EmpresaModel } from "./empresa_model";

export interface ReceitaModel {
    id?: number;
    nome: string;
    valorEstimado: number;
    usuarioCriou?: number;
    dataPrevisao: number;
    empresaId?:number;
    empresa?: EmpresaModel;
}

export interface ReceitaModelTable {
    id?: number;
    nome: string;
    valorEstimado: string;
    usuarioCriou?: number;
    dataPrevisao: number;
}

