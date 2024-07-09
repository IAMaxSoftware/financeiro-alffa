'use client'

import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
  DashboardSidebarFooter,
} from '@/components/dashboard/sidebar'
import { usePathname } from 'next/navigation'
import { HomeIcon, MixerVerticalIcon, PlusCircledIcon, PaperPlaneIcon } from '@radix-ui/react-icons'
import { UserDropdown } from './user-dropdown'
import { Session } from 'next-auth'
import { Logo } from '@/components/logo'

import SelecionaEmpresa from "@/components/selecionaEmpresa"

type MainSidebarProps = {
  user: Session['user']
}

export function MainSidebar({ user }: MainSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <DashboardSidebar>
      <DashboardSidebarHeader>
        <SelecionaEmpresa />
      </DashboardSidebarHeader>
      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/app" active={isActive('/app')}>
              <HomeIcon className="w-3 h-3 mr-3" />
              Dashboard
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/cadastros"
              active={isActive('/app/cadastros')}
            >
              <PlusCircledIcon className="w-3 h-3 mr-3" />
              Cadastros
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/lancamentos"
              active={isActive('/app/lancamentos')}
            >
              <PaperPlaneIcon className="w-3 h-3 mr-3" />
              Lançamentos
            </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
          <DashboardSidebarNavLink
            href="/app/settings"
            active={isActive('/app/settings')}
          >
            <MixerVerticalIcon className="w-3 h-3 mr-3" />
            Configurações
          </DashboardSidebarNavLink>
        </DashboardSidebarNav>

        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavHeader>
            <DashboardSidebarNavHeaderTitle>
              Links extras
            </DashboardSidebarNavHeaderTitle>
          </DashboardSidebarNavHeader>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/">
              Precisa de ajuda?
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/">Site</DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>
      <DashboardSidebarFooter>
        <UserDropdown user={user} />
      </DashboardSidebarFooter>
    </DashboardSidebar>
  )
}
