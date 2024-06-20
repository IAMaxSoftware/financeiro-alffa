import { DespesaDto } from "@/app/api/dtos/despesa.dto";
import { DespesasService } from "../despesas.service";

async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (id) {
            const despesaService = new DespesasService();
            const response = await despesaService.getById(+id)
            return Response.json(response)
        } else {
            return new Response('ID Not found', { status: 400 })
        }
    } catch (error) {
        throw new Error(String(error))
    }
}


async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (id) {
            const body = await request.json() as DespesaDto;
            const despesaService = new DespesasService();
            const response = await despesaService.update(+id, body)
            return Response.json(response)
        } else {
            return new Response('ID Not found', { status: 400 })
        }
    } catch (error) {
        throw new Error(String(error))
    }
}

async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (id) {
            const despesaService = new DespesasService();
            const response = await despesaService.delete(+id)
            return new Response(null, { status: 204 })
        } else {
            return new Response('ID Not found', { status: 400 })
        }
    } catch (error) {
        throw new Error(String(error))
    }
}

export { GET, PUT, DELETE }