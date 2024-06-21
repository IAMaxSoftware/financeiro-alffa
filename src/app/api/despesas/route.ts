import { DespesaDto } from "@/app/api/dtos/despesa.dto"
import { DespesasService } from "./despesas.service"
import { type NextRequest } from 'next/server'

async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const nome = searchParams.get('nome') || undefined
        const empresaId = searchParams.get('empresaId') || undefined
        const max = searchParams.get('max') || undefined
        const id = searchParams.get('id') || undefined
        const despesaService = new DespesasService();
        const response = await despesaService.getDespesas({
            nome,
            empresaId,
            max,
            id,
        })
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}

async function POST(request: Request) {
    try {
        const body = await request.json() as DespesaDto;
        const despesaService = new DespesasService();
        const response = await despesaService.create(body)
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}

export { GET, POST }