'use client'

import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import CadastrarLancamento from "../../lancamentos/cadastrar/page"

type CandidatoUpsertSheetProps = {
    children?: React.ReactNode
}

export function LancamentoUpsertSheet({ children }: CandidatoUpsertSheetProps) {

    return (
        <CadastrarLancamento />
    )
}
