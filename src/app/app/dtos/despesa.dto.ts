export interface DespesaDto {
    nome: string;
    valorEstimado: number;
    usuarioCriou: number;
    dataPrevisao: number;
    empresaId: number;
}

export interface DespesaQuery {
    nome?: string;
    empresaId?: string;
}