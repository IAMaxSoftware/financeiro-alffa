"use client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Ban } from 'lucide-react';
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
import { toast } from "@/components/ui/use-toast"
import { LancamentoTableModel } from "@/app/app/models/lancamento_model";
import { useAppData } from "../../context/app_context";
import { LancamentoRepository } from "../../repositories/lancamento_repository";

type PropsCell = {
    row: Row<LancamentoTableModel>;
}

export const lancamentoDataTable: ColumnDef<LancamentoTableModel>[] = [
    {
        accessorKey: "obs",
        header: "Nome",
    },
    {
        accessorKey: "real",
        header: "Valor",
    },
    {
        accessorKey: "tipo",
        header: "Tipo",
    },
    {
        id: "Ação",
        cell: CancelaCell
    },
]

function CancelaCell({ row }: PropsCell) {
    const lancamento = row.original;
    const { setControleUniversal } = useAppData();
    const deletar = async (id: number) => {
        try {
            const repository = new LancamentoRepository();
            const sucess = await repository.delete(id);
            sucess ? toast({
                description: "Lançamento cancelado com sucesso",
            }) : null;
            setControleUniversal(sucess);
            navigator.clipboard.writeText(lancamento.id!.toString());
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro.",
                description: "Não foi possível cancelar o lançamento!"
            });
        }
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Toggle
                    aria-label="Toggle bold">
                    <Ban color="orange"></Ban>
                </Toggle>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cancelar Lançamento</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja cancelar ?
                    </DialogDescription>
                </DialogHeader>
                <div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                deletar(lancamento.id!);
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
}
