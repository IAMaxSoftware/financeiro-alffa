import { AsaasService } from "./asaas.service";
import { AsaasDto } from "../dtos/asaas.dto";

async function POST(request: Request) {
    try {
        const aux = await request.json();
        const body = {
            value: aux.payment.value,
            description: aux.payment.description
        } as AsaasDto;
        console.log(body);
        const lancamentoService = new AsaasService();
        const response = await lancamentoService.create(body)
        console.log(response);
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}


export { POST }