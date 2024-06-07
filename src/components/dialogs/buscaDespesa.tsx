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
import { DeleteIcon } from 'lucide-react';
import { DespesaModelTable } from "@/app/models/despesa_model"
import { useAppData } from "@/app/context/app_context"
import { DespesaRepository } from "@/app/repositories/despesa_repository"

export function BuscaDespesa() {

    const [textoBusca, setTextoBusca] = useState('');
    const [data, setData] = useState<DespesaModelTable[]>([])


    useEffect(() => {
        busca();
    }, [textoBusca])

    function busca() {

    }



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex flex-row">
                    <Search></Search>
                    <p>Buscar Despesa</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
            const deletar = async (id: number) => {
                try {
                    const repository = new DespesaRepository();
                    await repository.delete(id);
                    navigator.clipboard.writeText(despesa.id!.toString())
                } catch (error) {
                    toast({
                        variant: "destructive",
                        title: "Erro.",
                        description: "Não foi possível deletar a despesa!"
                    })
                }
            }

            return (
                <DeleteIcon color="orange" onClick={() => deletar(despesa.id!)}>Excluir</DeleteIcon>
            );
        }
    },
]
