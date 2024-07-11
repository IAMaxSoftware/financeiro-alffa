import { AsaasService } from "./asaas.service";
import { AsaasDto } from "../dtos/asaas.dto";

async function POST(request: Request) {
    try {
        const aux = await request.json();
        const body = {
            value: aux.payment.value,
            description: aux.payment.description
        } as AsaasDto;
        const asaasService = new AsaasService();
        const response = await asaasService.create(body)
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}


export { POST }