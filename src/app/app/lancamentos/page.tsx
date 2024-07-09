"use client"
import { DataTable } from "@/components/ui/data-table";
import { lancamentoDataTable } from "./_components/lancamento-data-table";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { DialogDefault } from "@/components/dialogs/dialogDefault";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CadastraLancamento from "./cadastrar/page";
import { useAppData } from "@/app/app/context/app_context";
import { LancamentoModel, LancamentoTableModel } from "@/app/app/models/lancamento_model";
import { LancamentoRepository } from "@/app/app/repositories/lancamento_repository";
import { Toaster } from "@/components/ui/toaster";
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";


export default function ListarLancamentos() {
    const { empresaSelecionada } = useAppData()
    const [data, setData] = useState<LancamentoTableModel[]>([])
    const { controleUniversal, setControleUniversal } = useAppData()

    useEffect(() => {
        if (controleUniversal) {
            setControleUniversal(false)
            getLancamentos()
        }
    }, [controleUniversal])

    useEffect(() => {
        getLancamentos()
    }, [])

    useEffect(() => {
        getLancamentos()
    }, [empresaSelecionada])

    const getLancamentos = async () => {
        try {
            const respository = new LancamentoRepository();
            const lancamentos = await respository.getLancamentosValorFormatado(empresaSelecionada?.id ?? 0);
            setData(lancamentos,);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Dados Incorretos.",
                description: `Erro ao buscar dados!\n"+${String(error)}`
            })
        }
    }


    return (
        <DashboardPage>
            <DashboardPageHeader>
                <DashboardPageHeaderTitle>{empresaSelecionada ? `Lançamentos | ${empresaSelecionada.nome}` : 'Lançamentos'}</DashboardPageHeaderTitle>
            </DashboardPageHeader>
            <DashboardPageMain>
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
                                        <Plus />
                                        <p>Cadastrar Lançamento</p>
                                    </Button>}
                                    Children={<CadastraLancamento />}
                                    title='Cadastrar Lançamento'
                                />
                                <p className="text-xs text-red-500">{empresaSelecionada != null ? '' : 'Selecione uma empresa para cadastrar o lançamento'}</p>
                            </div>
                        </div>
                    </div>
                    <Toaster />
                    <DataTable columns={lancamentoDataTable} data={data} />
                </div>
            </DashboardPageMain>
        </DashboardPage>
    )

}