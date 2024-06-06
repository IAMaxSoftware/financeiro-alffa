

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
import { ColumnDef } from "@tanstack/react-table"
import { DeleteIcon, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DialogDefault } from "@/components/dialogs/dialogDefault";
import { DespesaModelTable } from "../../models/despesa_model";
import { useAppData } from "../../context/app_context";
import { DespesaRepository } from "../../repositories/despesa_repository";
import CadastraDespesa from "./cadastrar";


export const columns: ColumnDef<DespesaModelTable>[] = [
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
            const { accessToken, setControleUniversal } = useAppData()
            const despesa = row.original;
            const deletar = async (id: number) => {
                try {
                    const repository = new DespesaRepository();
                    const cod = await repository.delete(id, accessToken);
                    setControleUniversal(true);
                    cod ? toast({
                        description: "Receita deletada com sucesso",
                    }) : null;
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
                <DialogDefault
                    size={425}
                    ButtonOpen={
                        <Eye className="hover:cursor-pointer" color="orange" ></Eye>
                    }
                    Children={<CadastraDespesa edit={true} despesa={Number(row.original.id)} />}
                    title='Editar Despesa'
                    descricao=""
                />
            );
        }
    },
    {
        header: "Deletar",
        id: "Ação",
        cell: ({ row }) => {
            const { accessToken, setControleUniversal } = useAppData()
            const despesa = row.original;
            const deletar = async (id: number) => {
                try {
                    const repository = new DespesaRepository();
                    const cod = await repository.delete(id, accessToken);
                    setControleUniversal(true);
                    cod ? toast({
                        description: "Receita deletada com sucesso",
                    }) : null;
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
                <Dialog>
                    <DialogTrigger asChild>
                        <Toggle
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
                        <DialogFooter >
                            <Button
                                variant="confirm"
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
    },
]
