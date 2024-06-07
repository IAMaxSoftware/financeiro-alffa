"use client"
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./colunm";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { DialogDefault } from "@/components/dialogs/dialogDefault";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CadastraLancamento from "./cadastrar/page";
import { useAppData } from "@/app/context/app_context";
import { LancamentoModel } from "@/app/models/lancamento_model";
import { LancamentoRepository } from "@/app/repositories/lancamento_repository";
import { Toaster } from "@/components/ui/toaster";

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
                <h1 className="p-4 text-orange-600 text-start">Lançamentos Cadastrados</h1>
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