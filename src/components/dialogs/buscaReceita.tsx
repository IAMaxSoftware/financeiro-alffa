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
import { CirclePlus } from 'lucide-react';
import { ReceitaModel, ReceitaModelTable } from "@/app/models/receita_model"
import { useAppData } from "@/app/context/app_context"
import { ReceitaRepository } from "@/app/repositories/receita_repository"

interface ParamsBuscaReceita {
    setReceita: React.Dispatch<React.SetStateAction<ReceitaModel>>;
}

export function BuscaReceita({ setReceita }: ParamsBuscaReceita) {

    const [textoBusca, setTextoBusca] = useState('');
    const [data, setData] = useState<ReceitaModelTable[]>([])
    const { accessToken, empresaSelecionada } = useAppData();


    useEffect(() => {
        busca();
    }, [textoBusca])

    async function busca() {
        if (textoBusca != "") {
            let rep = new ReceitaRepository();
            var Receitas: ReceitaModelTable[] = await rep.getReceitasPorNome(accessToken, textoBusca, empresaSelecionada.id);
            setData(Receitas);
        }


    }



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex flex-row">
                    <Search></Search>
                    <p>Buscar Receita</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Busca Receita</DialogTitle>
                    <DialogDescription>
                        Pesquisa a receita que você deseja buscar
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


const columns: ColumnDef<ReceitaModelTable>[] = [
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
            const receita = row.original;
            const selecionar = async (id: number) => {
                try {
                    const repository = new ReceitaRepository();
                    await repository.delete(id);
                    navigator.clipboard.writeText(receita.id!.toString())
                } catch (error) {
                    toast({
                        variant: "destructive",
                        title: "Erro.",
                        description: "Não foi possível deletar a receita!"
                    })
                }
            }

            return (
                <CirclePlus color="orange" onClick={() => selecionar(receita.id!)}>Selecionar</CirclePlus>
            );
        }
    },
]
