export interface DespesaDto {
    nome: string;
    valorEstimado: number;
    emailUsuario: string;
    dataPrevisao: number;
    empresaId: number;
}

export interface DespesaQuery {
    nome?: string;
    empresaId?: string;
}