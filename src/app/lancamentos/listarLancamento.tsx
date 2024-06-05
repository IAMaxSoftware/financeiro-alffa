import { DataTable } from "@/components/ui/data-table";
import { columns } from "./colunm";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAppData } from "@/context/app_context";
import { Toaster } from "@/components/ui/toaster";
import { LancamentoModel } from "@/models/lancamento_model";
import { LancamentoRepository } from "@/repositories/lancamento_repository";
import { DialogDefault } from "@/components/dialogs/dialogDefault";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CadastraLancamento from "./cadastrarLancamento";

export default function ListarLancamentos() {
    const { accessToken, usuarioLogado, empresaSelecionada, controleUniversal, setControleUniversal } = useAppData()
    const [data, setData] = useState<LancamentoModel[]>([])

    useEffect(() => {
        getReceitas()
    }, [])

    const getReceitas = async () => {
        try {
            const respository = new LancamentoRepository();
            const Receitas = await respository.getLancamentos(accessToken);
            setData(Receitas);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Dados Incorretos.",
                description: `Erro ao buscar dados!\n"+${String(error)}`
            })
        }
    }


    return (
        <div className="container mx-auto py-10">
            <div className="grid grid-cols-2">
                <h1 className="p-4 text-orange-600 text-start">Lançamentos Cadastradas</h1>
                <div className="flex flex-col items-end">
                    <div className="flex flex-col items-end">
                        <DialogDefault
                            size={600}
                            ButtonOpen={<Button
                                disabled={empresaSelecionada != null ? false : true}
                                className="flex flex-row w-44">
                                <Plus ></Plus>
                                <p>Cadastrar Lançamento</p>
                            </Button>}
                            Children={<CadastraLancamento />}
                            title='Cadastrar Lançamento'
                            descricao=""
                        />
                        <p className="text-xs text-red-500">{empresaSelecionada != null ? '' : 'Selecione uma empresa para cadastrar o lançamento'}</p>
                    </div>
                </div>
            </div>
            <Toaster />
            <DataTable columns={columns} data={data} />
        </div>
    )

}