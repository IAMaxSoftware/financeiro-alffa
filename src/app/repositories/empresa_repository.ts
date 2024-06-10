
import { EmpresaModel } from "../models/empresa_model";

import {api} from "../services/api";

async function getAllEmpresas(): Promise<EmpresaModel[]> {
    const dados = await api.get('/empresas');
    const empresas = dados.data as EmpresaModel[];
    return empresas;
}
export { getAllEmpresas }
