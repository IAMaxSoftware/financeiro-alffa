"use client"

import EntradasSaidasBarras from "@/components/graficos/entradassaidas"
import PizzaEntradaSaida from "@/components/graficos/pizzaEntradaSaida"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./column"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { DatasIntervalo } from "./calendarioIntervalo"
import * as React from "react"
import { DateRange } from "react-day-picker"
import { MovimentacoesModel } from "../models/movimentacoes_model"
import { getFirstDayOfCurrentMonth } from "../functions/utils"
import { MovimentacoesRepository } from "../repositories/movimentacoes_repository"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Home() {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  const [movimentacoes, setMovimentacoes] = useState<MovimentacoesModel[]>([])
  const [dataRange, setDateRange] = React.useState<DateRange | undefined>({
    from: getFirstDayOfCurrentMonth(),
    to: new Date(),
  })
  useEffect(() => {
    getMovimentacoes()
  }, [])

  useEffect(() => {
    getMovimentacoes()
  }, [dataRange])


  const getMovimentacoes = async () => {
    try {
      const respository = new MovimentacoesRepository();
      const movimentacao = await respository.getMovimentacoes();
      setMovimentacoes(movimentacao);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Dados Incorretos.",
        description: `Erro ao buscar dados!\n"+${String(error)}`
      })
    }
  }

  return (
    <div className="flex-column ">

      <main className="flex-column  ">
        <DatasIntervalo dataRange={dataRange} setDataRange={setDateRange} className="py-2 mx-2.5" />
        <div className="lg:grid lg:grid-cols-2 ">
          <div className="h-60 	flex-column shadow-black mx-2.5 rounded border-2 mt-0.5	">
            <EntradasSaidasBarras />
          </div>
          <div className="h-60 	flex-column shadow-black mx-2.5 rounded border-2 mt-0.5	">
            <PizzaEntradaSaida />
          </div>
        </div>
        <div className="container mx-auto py-10">
          <h1 className="p-4 text-orange-600">Movimentações</h1>
          <DataTable columns={columns} data={movimentacoes} />
        </div>
      </main>
    </div>
  )

}