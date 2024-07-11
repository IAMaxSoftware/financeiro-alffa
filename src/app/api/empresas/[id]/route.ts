import { EmpresaDto } from "../../dtos/empresa.dto";
import { EmpresaService } from "../empresas.service";

async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const body = await request.json() as EmpresaDto;
        console.log(body);
        if (!id) {
            throw new Error('ID não fornecido');
        }
        const empresaService = new EmpresaService();
        const response = await empresaService.update(parseInt(id), body);
        return Response.json(response);
    } catch (error) {
        throw new Error(String(error));
    }
}

export { PUT }