import { type NextRequest } from 'next/server'
import { MovimentacoesService } from "./movimentacoes.service";
export const dynamic = 'force-dynamic';
async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const dataInicial = (searchParams.get('dataInicial') && new Date(searchParams.get('dataInicial') || '')) || undefined
        const dataFinal = (searchParams.get('dataFinal') && new Date(searchParams.get('dataFinal') || '')) || undefined
        const empresaId = searchParams.get('empresaId') || undefined
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

export { GET }
