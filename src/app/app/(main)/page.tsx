"use client"

import EntradasSaidasBarras from "@/components/graficos/entradassaidas"
import PizzaEntradaSaida from "@/components/graficos/pizzaEntradaSaida"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./_components/mov-data-table"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { DateRange } from "react-day-picker"
import { MovimentacoesModel } from "../models/movimentacoes_model"
import { getFirstDayOfCurrentMonth } from "../functions/utils"
import { MovimentacoesRepository } from "../repositories/movimentacoes_repository"
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderNav, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppData } from "../context/app_context"
import { DialogDefault } from "@/components/dialogs/dialogDefault"
import CadastrarLancamento from "../lancamentos/cadastrar/page"
import { DatasIntervalo } from "../cadastros/receitas/_components/calendarioIntervalo"

export default function Home() {
  const { empresaSelecionada, controleUniversal, setControleUniversal } = useAppData()
  const [movimentacoes, setMovimentacoes] = useState<MovimentacoesModel[]>([])
  const [dataRange, setDateRange] = useState<DateRange | undefined>({
    from: getFirstDayOfCurrentMonth(),
    to: new Date(),
  })

  useEffect(() => {
    getMovimentacoes()
    if (controleUniversal) {
      setControleUniversal(!setControleUniversal)
    }
  }, [dataRange, controleUniversal])

  useEffect(() => {
    getMovimentacoes()
    if (controleUniversal) {
      setControleUniversal(!setControleUniversal)
    }
  }, [])



  const getMovimentacoes = async () => {
    try {
      const respository = new MovimentacoesRepository();
      let movimentacao: MovimentacoesModel[];
      if (dataRange?.from && dataRange?.to) {
        movimentacao = await respository.getMovimentacoesBetween(dataRange.from, dataRange.to, empresaSelecionada.id);
      } else {
        movimentacao = await respository.getMovimentacoes(empresaSelecionada.id);
      }
      movimentacao.sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
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
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>{empresaSelecionada ? `Dashboard | ${empresaSelecionada.nome}` : 'Dashboard'}</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <DashboardPageHeaderNav className="flex flex-row-reverse">
            <DialogDefault Children={<CadastrarLancamento />} size={800} title="Lançamento" ButtonOpen={<Button disabled={!empresaSelecionada} variant="default" size="sm">
              <PlusIcon className="w-4 h-4 mr-3" />
              Add Lançamento
            </Button>}>
            </DialogDefault>
            <p className="text-xs text-red-500 p-2">{empresaSelecionada != null ? '' : 'Selecione uma empresa para cadastrar o lançamento'}</p>
          </DashboardPageHeaderNav>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div className="flex-column ">
          <main className="flex-column  ">
            <DatasIntervalo dataRange={dataRange} setDataRange={setDateRange} className="py-2 mx-2.5" />
            <div className="lg:grid lg:grid-cols-2 ">
              <div className="h-60 	flex-column shadow-black mx-2.5 rounded border-2 mt-0.5	">
                <EntradasSaidasBarras movimentacoes={movimentacoes} />
              </div>
              <div className="h-60 	flex-column shadow-black mx-2.5 rounded border-2 mt-0.5	">
                <PizzaEntradaSaida movimentacoes={movimentacoes} />
              </div>
            </div>
            <div className="container mx-auto py-10">
              <h1 className="p-4 text-orange-600">Movimentações</h1>
              <DataTable columns={columns} data={movimentacoes} />
            </div>
          </main>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  )

}