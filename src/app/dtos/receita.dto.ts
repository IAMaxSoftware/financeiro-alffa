export interface ReceitaDto {
    nome: string;
    valorEstimado: number;
    usuarioCriou: number;
    dataPrevisao: number;
    empresaId: number;
}


export interface ReceitaQuery {
    nome?: string;
    empresaId: string;
}