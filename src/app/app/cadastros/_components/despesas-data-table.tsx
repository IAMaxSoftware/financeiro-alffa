"use client"

import { toast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Toggle } from "@radix-ui/react-toggle";
import { ColumnDef, Row } from "@tanstack/react-table"
import { DeleteIcon, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DialogDefault } from "@/components/dialogs/dialogDefault";
import CadastraDespesa from "../(main)/cadastrar";
import { DespesaModelTable } from "../../models/despesa_model";
import { DespesaRepository } from "../../repositories/despesa_repository";
import { useRouter } from "next/navigation";
import { useAppData } from "../../context/app_context";
import { useRef } from "react";

type PropsCell = {
    row: Row<DespesaModelTable>;
}


export const receitasDataTable: ColumnDef<DespesaModelTable>[] = [
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
        header: "Visualizar",
        id: "visualizar",
        cell: Visualizar
    },
    {
        header: "Deletar",
        id: "Ação",
        cell: DeletarCell
    },
]

function DeletarCell({ row }: PropsCell) {
    const despesa = row.original;
    const ref = useRef<HTMLButtonElement>(null);
    const { setControleUniversal } = useAppData();
    const deletar = async (id: number) => {
        try {
            const repository = new DespesaRepository();
            const cod = await repository.delete(id);
            cod ? toast({
                description: "Receita deletada com sucesso",
            }) : null;
            ref.current?.click();
            setControleUniversal(true);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro.",
                description: "Não foi possível deletar a despesa!"
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Toggle ref={ref}
                    aria-label="Toggle bold">
                    <DeleteIcon color="orange"></DeleteIcon>
                </Toggle>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Excluir Despesa</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir a despesa?
                    </DialogDescription>
                </DialogHeader>
                <div>

                </div>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => deletar(despesa.id!)}>
                        Sim
                    </Button>
                    <DialogClose asChild>
                        <Button variant="destructive">
                            Não
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function Visualizar({ row }: PropsCell) {
    const { empresaSelecionada } = useAppData();
    return (
        <DialogDefault
            size={425}
            ButtonOpen={empresaSelecionada ? <Eye className="hover:cursor-pointer" color="orange"></Eye> : <EyeOff color="orange" />}
            Children={<CadastraDespesa despesaid={row.original.id ?? 0} edit={false} />}
            title='Editar Despesa' />
    );
}

