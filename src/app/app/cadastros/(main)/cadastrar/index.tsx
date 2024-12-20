"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import swal from 'sweetalert'
import MoneyInput from "@/components/ui/money-input"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { DespesaRepository } from "@/app/app/repositories/despesa_repository"
import { useAppData } from "@/app/app/context/app_context"

const formSchema = z.object({
    despesa: z.string().min(2).max(100, {
        message: "A despesa não pode ser menor que 2 caracteres e maior que 100."
    },),
    valorEstimado: z.coerce.number(),
    dataPrevisao: z.coerce.number()
})

type ParamsCadastraDespesa = {
    edit?: boolean;
    despesaid?: number;
}

export default function CadastraDespesa({ edit = false, despesaid = 0 }: ParamsCadastraDespesa) {
    const { empresaSelecionada, setControleUniversal } = useAppData()
    const { data: session } = useSession();
    const navigate = useRouter();
    const [carregando, setCarregando] = useState(true);
    const [editEstado, setEditEstado] = useState<boolean>(edit);
    const form = useForm<z.infer<typeof formSchema>>({

        resolver: zodResolver(formSchema),
        defaultValues: {
            despesa: "",
            valorEstimado: 0,
            dataPrevisao: 0
        },
    })

    useEffect(() => {
        despesaid ? fetchDespesa() : setCarregando(false);
    }, [])



    const fetchDespesa = async () => {
        try {
            const repository = new DespesaRepository();
            const despesaData = await repository.getDespesaById(despesaid ?? 0);
            if (despesaData) {
                form.setValue("despesa", despesaData.nome);
                console.log('Valor Estimado:' + despesaData.valorEstimado)
                form.setValue("valorEstimado", despesaData.valorEstimado);
                form.setValue("dataPrevisao", despesaData.dataPrevisao);
                setCarregando(false);
            }
        } catch (error) {
            swal({
                title: "Erro.",
                text: `Erro ao buscar despesa!\n${String(error)}`,
                dangerMode: true
            })
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (!empresaSelecionada) {
                swal({
                    title: "Empresa não selecionada",
                    text: "Empresa é obrigatória!"
                })
                return;
            }
            const repository = new DespesaRepository();
            const despesa = await repository.create({
                id: despesaid,
                nome: values.despesa,
                valorEstimado: values.valorEstimado,
                dataPrevisao: values.dataPrevisao,
                empresaId: empresaSelecionada.id,
                emailUsuario: session?.user?.email ?? ""
            })
            if (despesa) {
                setControleUniversal(true);
                swal({
                    title: "ok",
                    text: despesaid > 0 ? "Despesa atualizada com sucesso!" : "Despesa cadastrada com sucesso!"
                })
                navigate.refresh()
            }
        } catch (error) {
            swal({
                title: "Dados Incorretos.",
                text: `Erro ao cadastrar despesa!\n${String(error)}`,
                dangerMode: true
            })
        }
    }

    return (
        <Card className="p-6">
            {carregando ? <></>
                :
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            disabled={!editEstado}
                            control={form.control}
                            name="despesa"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Despesa</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Despesa" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Informe a despesa para cadastrar
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <MoneyInput
                            disabled={!editEstado}
                            value={form.getValues("valorEstimado")}
                            form={form}
                            label="Valor estimado"
                            name="valorEstimado"
                            placeholder='Informe o valor'
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
                                        Informe o dia do mês que vence a despesa
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormMessage />
                        {editEstado ? <Button type="submit">Salvar</Button> :
                            <></>}

                    </form>
                    {!editEstado ? <Button type="button" onClick={() => setEditEstado(!editEstado)} className="place-self-end">Editar</Button> : <></>}
                </Form>
            }


        </Card>
    )

}