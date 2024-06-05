import { DespesaDto } from "@/app/dtos/despesa.dto"
import { DespesasService } from "./despesas.service"
import { type NextRequest } from 'next/server'

async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const nome = searchParams.get('nome') || undefined
        const empresaId = searchParams.get('empresaId') || undefined
        const despesaService = new DespesasService();
        const response = await despesaService.getDespesas({
            nome,
            empresaId
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