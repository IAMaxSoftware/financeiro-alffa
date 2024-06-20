export interface LancamentoDto {
    valor: number;
    obs?: string;
    recDesId: number;
    userId: number;
    empresaId: number;
    tipo: string;
    dataHora: Date;
}

export interface LancamentoQuery {
    nome?: string;
    empresaId?: string;
}