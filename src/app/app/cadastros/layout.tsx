'use client'

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { PropsWithChildren } from 'react'
import { CadastrosSidebar } from './_components/cadastros-sidebar'
import { useAppData } from '../context/app_context'

export default function Layout({ children }: PropsWithChildren) {
  const { empresaSelecionada } = useAppData();

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>{empresaSelecionada ? `Cadastros | ${empresaSelecionada.nome}` : 'Cadastros'}</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div className="container max-w-screen-lg">
          <div className="grid grid-cols-[10rem_1fr] gap-12">
            <CadastrosSidebar />
            <div>{children}</div>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  )
}