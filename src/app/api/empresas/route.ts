import { EmpresaDto } from '@/app/api/dtos/empresa.dto';
import { EmpresaService } from './empresas.service';
import { type NextRequest } from 'next/server'

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

async function PUT(request: Request) {
    try {
        console.log('request')
        const body = await request.json() as EmpresaDto;
        console.log(body);
        const searchParams = new URL(request.url).searchParams;
        const id = searchParams.get('id') || undefined;
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


async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('id') || undefined
        const empresaService = new EmpresaService();
        const response = await empresaService.delete(parseInt(id ?? '0'))
        return Response.json(response)
    } catch (error) {
        throw new Error(String(error))
    }
}


export { GET, POST, DELETE, PUT }