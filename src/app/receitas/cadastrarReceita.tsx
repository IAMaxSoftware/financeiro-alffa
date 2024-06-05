import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppData } from "@/context/app_context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { format } from "date-fns"
import swal from 'sweetalert'
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "../../../lib/utils"
import { ReceitaRepository } from "@/repositories/receita_repository"
import { NameRoutes } from "@/functions/utils"
import MoneyInput from "@/components/ui/money-input"

const formSchema = z.object({
    receita: z.string().min(2).max(100, {
        message: "A receita não pode ser menor que 2 caracteres e maior que 100."
    },),
    valorEstimado: z.coerce.number(),
    dataPrevisao: z.coerce.number(),
})

export default function CadastraReceita() {
    const { usuarioLogado, accessToken, empresaSelecionada, setControleUniversal } = useAppData()
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({

        resolver: zodResolver(formSchema),
        defaultValues: {
            receita: "",
            valorEstimado: 0,
            dataPrevisao: 0
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const repository = new ReceitaRepository();
            const receita = await repository.create({
                nome: values.receita,
                valorEstimado: values.valorEstimado,
                usuarioCriou: usuarioLogado.id,
                dataPrevisao: values.dataPrevisao,
                empresaId: empresaSelecionada.id
            }, accessToken)
            if (receita) {
                setControleUniversal(true);
                swal({
                    title: "ok",
                    text: "Receita cadastrada com sucesso!"
                })
                navigate(NameRoutes.listarReceita)
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
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
                                    Informe o dia do mês que vence a Receita
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