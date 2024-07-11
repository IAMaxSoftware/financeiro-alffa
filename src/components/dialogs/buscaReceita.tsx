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
import { ColumnDef, Row } from "@tanstack/react-table"
import { SquarePlus } from 'lucide-react';
import { ReceitaModel, ReceitaModelTable } from "@/app/app/models/receita_model"
import { AppProvider, useAppData } from "@/app/app/context/app_context"
import { DialogClose } from "@radix-ui/react-dialog"
import { ReceitaRepository } from "@/app/app/repositories/receita_repository"

interface propsBuscaReceita {
    empresaId: number;
    enable: boolean;
}



export function BuscaReceita({ empresaId, enable }: propsBuscaReceita) {

    const [textoBusca, setTextoBusca] = useState('');
    const [data, setData] = useState<ReceitaModelTable[]>([])
    const { receitaSelecionada } = useAppData();

    useEffect(() => {
        busca();
    }, [textoBusca])

    async function busca() {
        const rep = new ReceitaRepository();
        let receitas: ReceitaModelTable[] = [];
        receitas = await rep.getReceitasByNomeFormatado(textoBusca, empresaId);
        setData(receitas);

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={!enable} className="flex flex-row">
                    <Search></Search>
                    <p>Buscar Receita</p>
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
        cell: SelecionarCell
    },
]

type PropsCell = {
    row: Row<ReceitaModelTable>;
}

function SelecionarCell({ row }: PropsCell) {
    const receita = row.original
    const { setReceitaSelecionada } = useAppData()
    const selecionar = async (id: number) => {
        try {
            const repository = new ReceitaRepository()
            const receita = await repository.getReceitaById(id)
            setReceitaSelecionada(receita)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro.",
                description: "Não foi possível selecionar a receita!"
            })
        }
    }

    return (
        <DialogClose asChild>
            <Button variant="secondary">
                <SquarePlus color="orange" onClick={() => selecionar(receita.id!)}>Selecionar</SquarePlus>
            </Button>
        </DialogClose>
    )
}
