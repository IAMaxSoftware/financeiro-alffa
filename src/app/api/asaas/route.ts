import { AsaasService } from "./asaas.service";
import { AsaasDto } from "../dtos/asaas.dto";

async function POST(request: Request) {
    try {
        const aux = await request.json();
        const body = {
            value: aux.value,
            description: aux.description
        } as AsaasDto;
        console.log(body);
        const lancamentoService = new AsaasService();
        const response = await lancamentoService.create(body)
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}


export { POST }