"use client"
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { DialogDefault } from "@/components/dialogs/dialogDefault";
import { Button } from "@/components/ui/button";
import CadastraReceita from "./cadastrar/page";
import { Plus } from "lucide-react";
import { useAppData } from "@/app/app/context/app_context";
import { ReceitaModelTable } from "@/app/app/models/receita_model";
import { ReceitaRepository } from "@/app/app/repositories/receita_repository";

export default function ListarReceitas() {
    const { empresaSelecionada, controleUniversal, setControleUniversal } = useAppData()
    const [data, setData] = useState<ReceitaModelTable[]>([])


    useEffect(() => {
        getReceitas()
    }, [])

    useEffect(() => {
        getReceitas()
    }, [empresaSelecionada])

    useEffect(() => {
        if (controleUniversal) {
            getReceitas();
            setControleUniversal(false);
        }
    }, [controleUniversal])


    const getReceitas = async () => {
        try {
            const respository = new ReceitaRepository();
            const Receitas = await respository.getReceitaValorFormatado(empresaSelecionada?.id || 0);
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
                <h1 className="p-4 text-orange-600 text-start">Receitas Cadastradas</h1>
                <div className="flex flex-col items-end">
                    <div className="flex flex-col items-end">
                        <DialogDefault
                            size={425}
                            ButtonOpen={<Button
                                disabled={empresaSelecionada != null ? false : true}
                                className="flex flex-row w-44">
                                <Plus ></Plus>
                                <p>Cadastrar Receita</p>
                            </Button>}
                            Children={<CadastraReceita edit={true} receitaid={undefined} />}
                            title='Cadastrar Receita'
                            descricao=""
                        />
                        <p className="text-xs text-red-500">{empresaSelecionada != null ? '' : 'Selecione uma empresa para cadastrar a receita'}</p>
                    </div>
                </div>
            </div>
            <Toaster />

            <DataTable columns={columns} data={data} />
        </div>
    )

}