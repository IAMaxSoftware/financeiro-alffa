"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DeleteIcon, Eye } from 'lucide-react';
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
import CadastraReceita from "./cadastrar/page";

export const columns: ColumnDef<ReceitaModelTable>[] = [
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
        cell: ({ row }) => {
            return (
                <DialogDefault
                    size={425}
                    ButtonOpen={
                        <Eye className="hover:cursor-pointer" color="orange" ></Eye>
                    }
                    Children={<CadastraReceita receitaid={row.original.id ?? undefined} edit={false} />}
                    title='Visualizar Receita'
                    descricao=""
                />
            );
        }
    },
    {
        header: "Deletar",
        id: "Ação",
        cell: ({ row }) => {
            const receita = row.original;
            const deletar = async (id: number) => {
                try {
                    const repository = new ReceitaRepository();
                    const cod = await repository.delete(id);
                    cod ? toast({
                        description: "Receita deletada com sucesso",
                    }) : null;
                    navigator.clipboard.writeText(receita.id!.toString())
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
                        <Toggle
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
        }
    },
]
