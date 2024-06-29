"use client"
import { useAppData } from "@/app/app/context/app_context";
import { NameRoutes } from "@/app/app/functions/utils";
import { ReceitaRepository } from "@/app/app/repositories/receita_repository";
import { Card } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import MoneyInput from "@/components/ui/money-input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import swal from 'sweetalert'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/services/auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const formSchema = z.object({
    receita: z.string().min(2).max(100, {
        message: "A receita não pode ser menor que 2 caracteres e maior que 100."
    },),
    valorEstimado: z.coerce.number(),
    dataPrevisao: z.coerce.number(),
})

interface ParamsCadastraReceita {
    edit: boolean | undefined;
    receitaid: number | undefined;
}

export default function CadastraReceita({ edit, receitaid }: ParamsCadastraReceita) {
    const { empresaSelecionada, setControleUniversal } = useAppData()
    const { data: session } = useSession();
    const navigate = useRouter();
    const [carregando, setCarregando] = useState(true);
    const [editEstado, setEditEstado] = useState(edit);
    const form = useForm<z.infer<typeof formSchema>>({

        resolver: zodResolver(formSchema),
        defaultValues: {
            receita: "",
            valorEstimado: 0,
            dataPrevisao: 0
        },
    })

    useEffect(() => {
        receitaid ? fetchReceita() : setCarregando(false);
    }, [])



    const fetchReceita = async () => {
        try {
            const repository = new ReceitaRepository();
            const receitaData = await repository.getReceitaById(receitaid ?? 0);
            if (receitaData) {
                form.setValue("receita", receitaData.nome);
                console.log('Valor Estimado:' + receitaData.valorEstimado)
                form.setValue("valorEstimado", receitaData.valorEstimado);
                form.setValue("dataPrevisao", receitaData.dataPrevisao);
                setCarregando(false);
            }
        } catch (error) {
            swal({
                title: "Erro.",
                text: `Erro ao buscar receita!\n${String(error)}`,
                dangerMode: true
            })
        }
    }


    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const repository = new ReceitaRepository();
            const receita = await repository.create({
                nome: values.receita,
                valorEstimado: values.valorEstimado,
                emailUsuario: session?.user?.email ?? "",
                dataPrevisao: values.dataPrevisao,
                empresaId: empresaSelecionada.id
            })
            if (receita) {
                setControleUniversal(true);
                swal({
                    title: "ok",
                    text: "Receita cadastrada com sucesso!"
                })
                navigate.push(NameRoutes.listarReceita)
            }
        } catch (error) {

            swal({
                title: "Dados Incorretos.",
                text: `Informe o nome da receita e o valor estimado!\n${String(error)}`,
                dangerMode: true
            })
        }
    }

    return (
        <Card className="p-6">
            {
                carregando ?
                    <></> :
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            disabled = {!editEstado}
                                control={form.control}
                                name="receita"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Receita</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Receita" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Informe a receita para cadastrar
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <MoneyInput
                                disabled={!editEstado??false}
                                value={form.getValues("valorEstimado")}
                                form={form}
                                label="Valor estimado"
                                name="valorEstimado"
                                placeholder="Valor estimado"
                            />

                            <FormField
                                control={form.control}
                                name="dataPrevisao"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dia</FormLabel>
                                        <FormControl>
                                            <Input disabled={!editEstado} type="number" placeholder="Dia do vencimento" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Informe o dia do mês que vence a Receita
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormMessage />
                            {editEstado ? <Button type="submit">Salvar</Button> :  
                            <></>}
                        </form>
                        {!editEstado ? <Button type="button" onClick={() => setEditEstado(!editEstado)} className="place-self-end">Editar</Button>:<></>}
                    </Form>

            }

        </Card>
    )

}