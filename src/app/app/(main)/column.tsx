import { ColumnDef } from "@tanstack/react-table"
import { IntlProvider, FormattedNumber } from 'react-intl'
import { MovimentacoesModel } from "../models/movimentacoes_model";

export const columns: ColumnDef<MovimentacoesModel>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "descricao",
        header: "Descrição",
        sortDescFirst: true
    },
    {
        id: "credito",
        header: "Crédito",
        cell: ({ row }) => {
            const mov = row.original;
            return (
                <IntlProvider locale="pt-br" defaultLocale="pt-br">
                    <FormattedNumber value={mov.credito} style="currency" currency="BRL" />
                </IntlProvider>
            );
        }
    },
    {
        id: "debito",
        header: "Dédito",
        cell: ({ row }) => {
            const mov = row.original;
            return (
                <IntlProvider locale="pt-br" defaultLocale="pt-br">
                    <FormattedNumber value={mov.debito} style="currency" currency="BRL" />
                </IntlProvider>
            );
        }
    },
]
