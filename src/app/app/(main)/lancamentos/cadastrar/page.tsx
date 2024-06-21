"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import swal from 'sweetalert'
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BuscaDespesa } from "@/components/dialogs/buscaDespesa"
import { BuscaReceita } from "@/components/dialogs/buscaReceita"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import MoneyInput from "@/components/ui/money-input"
import { useAppData } from "@/app/app/context/app_context"
import { ReceitaModel } from "@/app/app/models/receita_model"
import { DespesaModel } from "@/app/app/models/despesa_model"
import { useRouter } from "next/navigation"
import { LancamentoRepository } from "@/app/app/repositories/lancamento_repository"
import { NameRoutes } from "@/app/app/functions/utils"
import { cn } from "../../../../../lib/utils"
import { getIdByEmail } from "@/app/api/lib/getIdByEmail"
import { useSession } from "next-auth/react";

const formSchema = z.object({
    obs: z.string().min(2).max(100, {
        message: "O Lançamento não pode ser menor que 2 caracteres e maior que 100."
    },),
    valor: z.coerce.number(),
    data: z.date(),
    tipo: z.enum(["D", "R"], {
        required_error: "You need to select a notification type.",
    }),
})



export default function CadasraLancamento() {
    const {empresaSelecionada, despesaSelecionada } = useAppData()
    const { data: session } = useSession();
    const [editCampoObs, setEditCampoObs] = useState(false);
    const [recDesId, setRecDesId] = useState(0);

    useEffect(() => {
        form.setValue('obs', despesaSelecionada?.nome ?? 'teste');
        setEditCampoObs(true);
    }, [despesaSelecionada])
    
    const navigate = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({

        resolver: zodResolver(formSchema),
        defaultValues: {
            obs: "",
            valor: 0,
            data: new Date(),
            tipo: "D"
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const repository = new LancamentoRepository();
            const lancamento = await repository.create({
                obs: values.obs,
                real: values.valor,
                userId: await getIdByEmail(session?.user?.email?? " "),
                dataHora: values.data,
                empresaId: empresaSelecionada.id,
                recDesId: recDesId,
                tipo: values.tipo
            })
            if (lancamento) {
                swal({
                    title: "ok",
                    text: "Lançamento cadastrada com sucesso!"
                })
                navigate.push(NameRoutes.listarReceita)
            }
        } catch (error) {

            swal({
                title: "Dados Incorretos.",
                text: `Informe os valores do lançamento!\n${String(error)}`,
                dangerMode: true
            })
        }
    }

    return (
        <ScrollArea className="h-96 rounded-md border">
            <Card className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="obs"
                            render={({ field }) => (
                                <div className="flex flex-row md:flex-col">
                                    <FormItem>
                                        <FormLabel>Lançamento</FormLabel>
                                        <FormControl>
                                            <Input disabled={editCampoObs} placeholder="lançamento" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Informe a descrição do lançamento para cadastrar
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                    <div className="flex md:flex-row md:pt-1">
                                        <div className="pl-6 pt-8 md:pt-0">
                                            <BuscaDespesa empresaId={empresaSelecionada.id} />
                                        </div>
                                        <div className="pl-6 pt-8 md:pt-0">
                                            {/* <BuscaReceita /> */}
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                        <MoneyInput
                            form={form}
                            label="Valor"
                            name="valor"
                            placeholder="Valor"
                        />
                        <FormField
                            control={form.control}
                            name='tipo'
                            render={({ field }) => (
                                <FormItem>
                                    <RadioGroup
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="D" id="r1" />
                                            <Label htmlFor="r1">Despesa</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="R" id="r2" />
                                            <Label htmlFor="r2">Receita</Label>
                                        </div>
                                    </RadioGroup>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="data"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Data</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Escolha a data</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Informe a data da Receita
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Cadastrar</Button>
                    </form>
                </Form>
            </Card >
        </ScrollArea>
    )

}