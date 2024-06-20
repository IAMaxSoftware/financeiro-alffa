import { LancamentoDto } from "@/app/api/dtos/lancamentos.dto";
import { LancamentosService } from "./lancamentos.service";
import { type NextRequest } from 'next/server'

async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const nome = searchParams.get('nome') || undefined
        const empresaId = searchParams.get('empresaId') || undefined
        const lancamentoService = new LancamentosService();
        const response = await lancamentoService.getLancamentos({ nome, empresaId });
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}

async function POST(request: Request) {
    try {
        const body = await request.json() as LancamentoDto;
        const lancamentoService = new LancamentosService();
        const response = await lancamentoService.create(body)
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}

export { GET, POST }