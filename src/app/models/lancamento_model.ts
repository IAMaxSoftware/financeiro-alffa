export interface LancamentoModel {
    id?: number;
    obs: string;
    recDesId: number,
    userId: number,
    empresaId: number,
    tipo: string,
    dataHora: Date
    valor: number
}

export interface LancamentoTableModel {
    id?: number;
    obs: string;
    recDesId: number,
    userId: number,
    empresaId: number,
    tipo: string,
    dataHora: Date,
    valor: string
}