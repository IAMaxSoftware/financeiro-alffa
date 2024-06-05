import { DespesaDto } from "@/app/dtos/despesa.dto";
import { ReceitasService } from "../receitas.service";

async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (id) {
            const receitaService = new ReceitasService();
            const response = await receitaService.getById(+id)
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
            const receitaService = new ReceitasService();
            const response = await receitaService.update(+id, body)
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
            const receitaService = new ReceitasService();
            const response = await receitaService.delete(+id)
            return new Response(null, { status: 204 })
        } else {
            return new Response('ID Not found', { status: 400 })
        }
    } catch (error) {
        throw new Error(String(error))
    }
}

export { GET, PUT, DELETE }