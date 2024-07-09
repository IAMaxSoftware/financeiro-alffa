'use client'

import {
  DashboardSidebarNav,
  DashboardSidebarNavLink,
  DashboardSidebarNavMain,
} from '@/components/dashboard/sidebar'
import { usePathname } from 'next/navigation'

export function CadastrosSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <aside>
      <DashboardSidebarNav>
        <DashboardSidebarNavMain>
          <DashboardSidebarNavLink
            href="/app/cadastros"
            active={isActive('/app/cadastros')}
          >
            Despesas
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/app/cadastros/receitas"
            active={isActive('/app/cadastros/receitas')}
          >
            Receitas
          </DashboardSidebarNavLink>
        </DashboardSidebarNavMain>
      </DashboardSidebarNav>
    </aside>
  )
}
