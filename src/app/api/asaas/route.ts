import { LancamentoDto } from "@/app/api/dtos/lancamentos.dto";
import { AsaasService } from "./asaas.service";

async function POST(request: Request) {
    try {
        const body = await request.json() as LancamentoDto;
        console.log(body);
        const lancamentoService = new AsaasService();
        const response = await lancamentoService.create(body)
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}


export { POST }