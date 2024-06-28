// import { type NextRequest } from 'next/server'
import { NextRequest } from "next/server";
import { MovimentacoesService } from "./movimentacoes.service";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const dataInicial = (searchParams.get('dataInicial') && new Date(searchParams.get('dataInicial') || '')) || undefined
        const dataFinal = (searchParams.get('dataFinal') && new Date(searchParams.get('dataFinal') || '')) || undefined
        const empresaId = '1'; //searchParams.get('empresaId') || ''
        const movimentacoesService = new MovimentacoesService();
        const response = await movimentacoesService.getMovimentacoes({
            dataInicial,
            dataFinal,
            empresaId
        })
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}
