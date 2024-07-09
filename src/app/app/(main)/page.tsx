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


  async function getDataAsaas() {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const res = await fetch('https://api.asaas.com/api/v3/payments?paymentDate[ge]=01%2F07%2F2024&paymentDate[le]=05%2F07%2F2024',
      {
        next: { revalidate: 3600 }, method: 'GET',
        headers: {
          accept: 'application/json',
          access_token: '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwMzM1MjY6OiRhYWNoXzg3YTMxMGNmLTkyMGYtNDA2My05YmYyLWIyNWZlNGJhYWU1NA=='
        },
      })


    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    console.log(res.json);
    return res.json()
  }

  useEffect(() => {
    getMovimentacoes()
    if (controleUniversal) {
      setControleUniversal(!setControleUniversal)
    }
  }, [dataRange, controleUniversal])


  const getMovimentacoes = async () => {
    try {
      const respository = new MovimentacoesRepository();
      let movimentacao: MovimentacoesModel[];
      if (dataRange?.from && dataRange?.to) {
        movimentacao = await respository.getMovimentacoesBetween(dataRange.from, dataRange.to, 1);
      } else {
        movimentacao = await respository.getMovimentacoes();
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
          <DashboardPageHeaderNav>
            <DialogDefault Children={<CadastrarLancamento />} size={800} title="Lançamento" ButtonOpen={<Button variant="default" size="sm">
              <PlusIcon className="w-4 h-4 mr-3" />
              Add Lançamento
            </Button>}>
            </DialogDefault>
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