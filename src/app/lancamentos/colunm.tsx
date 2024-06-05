
import { Toaster } from "@/components/ui/toaster"
import { useAppData } from "@/context/app_context";
import { ReceitaModel } from "@/models/receita_model";
import { DespesaRepository } from "@/repositories/despesa_repository";
import { ColumnDef } from "@tanstack/react-table"
import { Ban, DeleteIcon } from 'lucide-react';
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
import { useToast } from "@/components/ui/use-toast"
import { LancamentoModel } from "@/models/lancamento_model";
import { LancamentoRepository } from "@/repositories/lancamento_repository";

export const columns: ColumnDef<LancamentoModel>[] = [
    {
        accessorKey: "obs",
        header: "Nome",
    },
    {
        accessorKey: "valor",
        header: "Valor",
    },
    {
        accessorKey: "tipo",
        header: "Tipo",
    },
    {
        id: "Ação",
        cell: ({ row }) => {
            const { toast } = useToast()
            const { accessToken, setControleUniversal } = useAppData()
            const lancamento = row.original;
            const deletar = async (id: number) => {
                try {
                    /*const repository = new LancamentoRepository();
                    const cod = await repository.delete(id, accessToken);*/
                    const cod = true;
                    setControleUniversal(true);
                    cod ? toast({
                        description: "Lançamento deletada com sucesso",
                    }): null;
                    navigator.clipboard.writeText(lancamento.id!.toString())
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
                    <DialogFooter >
                    <DialogClose asChild>
                    <Button
                        variant="confirm"
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
    },
]
