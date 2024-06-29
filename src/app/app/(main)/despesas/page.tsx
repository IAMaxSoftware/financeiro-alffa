"use client"
import { DataTable } from "@/components/ui/data-table";
import { DialogDefault } from "@/components/dialogs/dialogDefault";
import { Button, ButtonProps } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CadastraDespesa from "./cadastrar/page";
import { Toaster } from "@/components/ui/toaster";
import React, { useEffect, useState } from "react";
import { DespesaModelTable } from "../../models/despesa_model";
import { useAppData } from "../../context/app_context";
import { DespesaRepository } from "../../repositories/despesa_repository";
import { toast } from "@/components/ui/use-toast";
import { columns } from "./column";
import { DatasIntervalo } from "../receitas/_components/calendarioIntervalo";
import { DateRange } from "react-day-picker";
import { getFirstDayOfCurrentMonth } from "../../functions/utils";


export default function ListarDespesas() {
    const { empresaSelecionada, controleUniversal, setControleUniversal } = useAppData()
    const [data, setData] = useState<DespesaModelTable[]>([])
    const [carregando, setCarregando] = useState(true);
    const [dataRange, setDateRange] = React.useState<DateRange | undefined>({
        from: getFirstDayOfCurrentMonth(),
        to: new Date(),
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




    const getDespesas = async () => {
        setCarregando(true);
        try {
            const respository = new DespesaRepository();
            const despesas = await respository.getDespesasValorFormatado(empresaSelecionada?.id || 0);
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
                <DatasIntervalo dataRange={dataRange} setDataRange={setDateRange} className="py-2 mx-2.5" />
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
                                    Children={<CadastraDespesa />}
                                    title='Cadastrar Despesa'
                                    descricao=""
                                />
                                <p className="text-xs text-red-500">{empresaSelecionada != null ? '' : 'Selecione uma empresa para cadastrar a despesa'}</p>
                            </div>
                        </div>

                    </div>
                    <Toaster />
                    <DataTable columns={columns} data={data} />
                </>
            }

        </div>
    )

}