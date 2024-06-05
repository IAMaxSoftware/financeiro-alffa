import { EmpresaDto } from '@/app/dtos/empresa.dto';
import { EmpresaService } from './empresas.service';

async function GET(request: Request) {
    try {
        const empresaService = new EmpresaService();
        const response = await empresaService.getEmpresas()
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}

async function POST(request: Request) {
    try {
        const body = await request.json() as EmpresaDto;
        const empresaService = new EmpresaService();
        const response = await empresaService.create(body)
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}

export { GET, POST }