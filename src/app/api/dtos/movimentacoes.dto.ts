export interface MovimentacoesDto {
    descricao: string;
    credito: number;
    debito: number;
    dataHora: Date;
    empresaId: number;
}

export interface MovimentacoesQuery {
    dataInicial?: Date;
    dataFinal?: Date;
    empresaId?: string;
}