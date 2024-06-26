export interface LancamentoDto {
    real: number;
    obs?: string;
    recDesId: number;
    userEmail: string;
    empresaId: number;
    tipo: string;
    dataHora: Date;
}

export interface LancamentoQuery {
    nome?: string;
    empresaId?: string;
}