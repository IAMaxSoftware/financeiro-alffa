export interface LancamentoModel {
    id?: number;
    obs: string;
    recDesId: number,
    userEmail: string,
    empresaId: number,
    tipo: string,
    dataHora: Date
    real: number
}

export interface LancamentoTableModel {
    id?: number;
    obs: string;
    recDesId: number,
    userEmail: string,
    empresaId: number,
    tipo: string,
    dataHora: Date,
    real: string,
}