"use client"
import { DataTable } from "@/components/ui/data-table";
import { DialogDefault } from "@/components/dialogs/dialogDefault";
import { Button, ButtonProps } from "@/components/ui/button";
import { Plus, PlusIcon } from "lucide-react";
import CadastraDespesa from "./cadastrar";
import { Toaster } from "@/components/ui/toaster";
import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { receitasDataTable } from "../_components/despesas-data-table";
import { DatasIntervalo } from "../receitas/_components/calendarioIntervalo";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderNav, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";
import { useAppData } from "../../context/app_context";
import { DespesaModelTable } from "../../models/despesa_model";
import { DespesaRepository } from "../../repositories/despesa_repository";

export default function ListarDespesas() {
    const { empresaSelecionada, controleUniversal, setControleUniversal } = useAppData()
    const [data, setData] = useState<DespesaModelTable[]>([])
    const [carregando, setCarregando] = useState(true);
    const [textPesquisa, setTextPesquisa] = useState('');
    const [dataRange, setDateRange] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })

    useEffect(() => {
        getDespesas()
    }, [])


    useEffect(() => {
        getDespesas()
    }, [empresaSelecionada, dataRange])

    useEffect(() => {
        if (controleUniversal) {
            getDespesas();
            setControleUniversal(false);
        }

    }, [controleUniversal])


    const pesquisaPorNome = (valor: string) => {
        setTextPesquisa(valor);
        getDespesaByNome();
    }

    const getDespesaByNome = async () => {
        try {
            const repository = new DespesaRepository();
            const despesas = await repository.getDespesasByNomeFormatado(textPesquisa, empresaSelecionada?.id || 0);
            setData(despesas);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Dados Incorretos.",
                description: `Erro ao buscar dados!\n"+${String(error)}`
            })
        }

    }


    const getDespesas = async () => {
        try {
            const repository = new DespesaRepository();
            var despesas: DespesaModelTable[];
            if (dataRange?.from && dataRange?.to) {
                console.log('aqui');
                despesas = await repository.getDespesasValorFormatadoBetween(dataRange?.from, dataRange?.to, empresaSelecionada?.id || 0);
            }
            else {
                despesas = await repository.getDespesasValorFormatado(empresaSelecionada?.id || 0)
            }
            console.log(despesas);
            setData(despesas);
            setCarregando(false);
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
            {carregando ?
                <></>
                :
                <>
                    <div className="flex flex-row">
                        <DatasIntervalo dataRange={dataRange} setDataRange={setDateRange} className="pb-2 mx-2.5" />
                        <Input placeholder="Digite o nome da despesa" className="pb-2 mx-2.5" type="text" value={textPesquisa} onChange={(e) => pesquisaPorNome(e.target.value)}></Input>
                    </div>
                    <div className="grid grid-cols-2">
                        <h1 className="p-4 text-orange-600 text-start">Despesas Cadastradas</h1>
                        <div className="flex flex-col items-end">
                            <div className="flex flex-col items-end">
                                <DialogDefault
                                    size={425}
                                    ButtonOpen={<Button
                                        disabled={empresaSelecionada != null ? false : true}
                                        className="flex flex-row w-44">
                                        <Plus ></Plus>
                                        <p>Cadastrar Despesa</p>
                                    </Button>}
                                    Children={<CadastraDespesa despesaid={0} edit={true} />}
                                    title='Cadastrar Despesa'
                                />
                                <p className="text-xs text-red-500">{empresaSelecionada != null ? '' : 'Selecione uma empresa para cadastrar a despesa'}</p>
                            </div>
                        </div>

                    </div>
                    <Toaster />
                    <DataTable columns={receitasDataTable} data={data} />
                </>
            }
        </div>
    )

}