import { LancamentoDto } from "@/app/dtos/lancamentos.dto";
import { LancamentosService } from "./lancamentos.service";

async function GET(request: Request) {
    try {
        const lancamentoService = new LancamentosService();
        const response = await lancamentoService.getLancamentos();
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