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

const formSchema = z.object({
    receita: z.string().min(2).max(100, {
        message: "A receita não pode ser menor que 2 caracteres e maior que 100."
    },),
    valorEstimado: z.coerce.number(),
    dataPrevisao: z.coerce.number(),
})

export default function CadastraReceita() {
    const { usuarioLogado, accessToken, empresaSelecionada, setControleUniversal } = useAppData()
    const navigate = useRouter();
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
                usuarioCriou: parseInt(usuarioLogado.id),
                dataPrevisao: values.dataPrevisao,
                empresaId: empresaSelecionada.id
            }, accessToken)
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