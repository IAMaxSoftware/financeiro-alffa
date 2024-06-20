import { ReceitaDto } from "@/app/api/dtos/receita.dto"
import { ReceitasService } from "./receitas.service"
import { type NextRequest } from 'next/server'

async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const nome = searchParams.get('nome') || undefined
        const empresaId = searchParams.get('empresaId') || ''
        const receitaService = new ReceitasService();
        const response = await receitaService.getReceitas({
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
        const body = await request.json() as ReceitaDto;
        const receitaService = new ReceitasService();
        const response = await receitaService.createReceita(body)
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}

export { GET, POST }