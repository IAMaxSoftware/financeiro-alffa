"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { Table } from "../ui/table"
import { DataTable } from "../ui/data-table"
import { toast } from "@/components/ui/use-toast";
import { ColumnDef } from "@tanstack/react-table"
import { SquarePlus  } from 'lucide-react';
import { DespesaModel, DespesaModelTable } from "@/app/app/models/despesa_model"
import { AppProvider, useAppData } from "@/app/app/context/app_context"
import { DespesaRepository } from "@/app/app/repositories/despesa_repository"
import { DialogClose } from "@radix-ui/react-dialog"

interface propsBuscaDespesa{
    empresaId:number;
    enable:boolean;
}



export function BuscaDespesa({empresaId, enable}:propsBuscaDespesa) {

    const [textoBusca, setTextoBusca] = useState('');
    const [data, setData] = useState<DespesaModelTable[]>([])
    const {despesaSelecionada} = useAppData();

    useEffect(() => {
        busca();
    }, [textoBusca])

    async function busca()
    {
        const rep = new DespesaRepository();
        let despesas: DespesaModelTable[] = [];
        despesas = await rep.getDespesasByNomeFormatado(textoBusca, empresaId );
        setData(despesas);
        
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={!enable} className="flex flex-row">
                    <Search></Search>
                    <p>Buscar Despesa</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Busca Despesa</DialogTitle>
                    <DialogDescription>
                        Pesquisa a despesa que você deseja buscar
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col">
                    <div>
                        <Input
                            onChange={(e) => setTextoBusca(e.target.value)}
                        ></Input>
                        <DataTable columns={columns} data={data} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


const columns: ColumnDef<DespesaModelTable>[] = [
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "valorEstimado",
        header: "Valor Estimado",
    },
    {
        accessorKey: "dataPrevisao",
        header: "Dia Pagamento",
    },
    {
        id: "Ação",
        cell: ({ row }) => {
            const despesa = row.original;
            const {setDespesaSelecionada} = useAppData()
            const selecionar = async (id: number) => {
                try {
                    const repository = new DespesaRepository();
                    const despesa = await  repository.getDespesaById(id);
                    setDespesaSelecionada(despesa);
                } catch (error) {
                    toast({
                        variant: "destructive",
                        title: "Erro.",
                        description: "Não foi possível selecionar a despesa!"
                    })
                }
            }

            return (
                <DialogClose asChild>
                    <Button  variant="secondary">
                        <SquarePlus color="orange" onClick={() => selecionar(despesa.id!)}>Selecionar</SquarePlus  >
                    </Button>
                </DialogClose>
            );
        }
    },
]
