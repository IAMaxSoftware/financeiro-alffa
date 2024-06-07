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
import { useEffect } from "react"
import { useAppData } from "../../../context/app_context"
import { useRouter } from "next/navigation"
import { DespesaRepository } from "../../../repositories/despesa_repository"
import { DespesaModel } from "../../../models/despesa_model"
import { getUserSession } from "../../../../../lib/session"

const formSchema = z.object({
    despesa: z.string().min(2).max(100, {
        message: "A despesa não pode ser menor que 2 caracteres e maior que 100."
    },),
    valorEstimado: z.coerce.number(),
    dataPrevisao: z.coerce.number()
})

interface ParamsCadastraDespesa {
    edit: boolean;
    despesa: number;
}

export default function CadastraDespesa() {
    const { usuarioLogado, empresaSelecionada, setControleUniversal } = useAppData()
    const navigate = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({

        resolver: zodResolver(formSchema),
        defaultValues: {
            despesa: "",
            valorEstimado: 0,
            dataPrevisao: 0
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const userSession = await getUserSession();
        try {
            const repository = new DespesaRepository();
            const despesa = await repository.create({
                nome: values.despesa,
                valorEstimado: values.valorEstimado,
                usuarioCriou: parseInt(userSession.id),
                dataPrevisao: values.dataPrevisao,
                empresaId: empresaSelecionada.id
            }, usuarioLogado.accessToken!)
            if (despesa) {
                setControleUniversal(true);
                swal({
                    title: "ok",
                    text: "Despesa cadastrada com sucesso!"
                })
                navigate.push('/listarDespesa')
            }
        } catch (error) {
            swal({
                title: "Dados Incorretos.",
                text: `Informe o nome da despesa e o valor estimado!\n${String(error)}`,
                dangerMode: true
            })
        }
    }

    return (
        <Card className="p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
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
                                    <Input type="number" placeholder="Dia do vencimento" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Informe o dia do mês que vence a despesa
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormMessage />



                    <Button type="submit">Cadastrar</Button>
                </form>
            </Form>
        </Card>
    )

}