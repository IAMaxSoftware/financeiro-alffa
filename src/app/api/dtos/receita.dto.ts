export interface ReceitaDto {
    nome: string;
    valorEstimado: number;
    emailUsuario: string;
    dataPrevisao: number;
    empresaId: number;
}


export interface ReceitaQuery {
    nome?: string;
    empresaId: string;
    dataPrevisao?: number;
    
}