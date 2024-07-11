"use client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { DeleteIcon, Eye, EyeOff } from 'lucide-react';
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
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast"
import { ReceitaModelTable } from "@/app/app/models/receita_model";
import { useAppData } from "@/app/app/context/app_context";
import { ReceitaRepository } from "@/app/app/repositories/receita_repository";
import { DialogDefault } from "@/components/dialogs/dialogDefault";
import CadastraReceita from "../cadastrar";
import { useRef } from "react";

type PropsCell = {
    row: Row<ReceitaModelTable>;
}

export const receitaDataTable: ColumnDef<ReceitaModelTable>[] = [
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


function Visualizar({ row }: PropsCell) {
    const { empresaSelecionada } = useAppData();
    return (
        <DialogDefault
            size={425}
            ButtonOpen={empresaSelecionada ? <Eye className="hover:cursor-pointer" color="orange"></Eye> : <EyeOff color="orange"></EyeOff>}
            Children={<CadastraReceita receitaid={row.original.id ?? undefined} edit={false} />}
            title='Visualizar Receita' />
    );
}

function DeletarCell({ row }: PropsCell) {
    const receita = row.original;
    const ref = useRef<HTMLButtonElement>(null)
    const { setControleUniversal } = useAppData()
    const deletar = async (id: number) => {

        try {
            const repository = new ReceitaRepository();
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
            })
        }
    }


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
                    <DialogTitle>Excluir Receita</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir a receita?
                    </DialogDescription>
                </DialogHeader>
                <div>
                </div>
                <DialogFooter >
                    <DialogClose asChild>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                deletar(receita.id!);
                            }}>
                            Sim
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>

                        <Button variant="destructive">
                            Não
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
