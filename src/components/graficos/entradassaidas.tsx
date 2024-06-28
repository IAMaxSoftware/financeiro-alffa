import { entradaGraficos, saidaGraficos } from '@/app/app/functions/utils';
import { MovimentacoesModel } from '@/app/app/models/movimentacoes_model';
import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type EntradasSaidasBarrasProps = {
    movimentacoes: MovimentacoesModel[];
}

export default function EntradasSaidasBarras({ movimentacoes }: EntradasSaidasBarrasProps) {
    const [data, setData] = useState<{ name: string, entrada: number, saida: number }[]>([]);

    const processarMovimentacoes = (movimentacoes: MovimentacoesModel[]) => {
        const groupedData: { [key: string]: { entrada: number, saida: number } } = {};

        movimentacoes.forEach(mov => {
            const date = new Date(mov.dataHora).toLocaleDateString('pt-BR');
            if (!groupedData[date]) {
                groupedData[date] = { entrada: 0, saida: 0 };
            }
            if (mov.credito > 0) {
                groupedData[date].entrada += parseFloat(mov.credito.toString());
            }
            if (mov.debito > 0) {
                groupedData[date].saida += parseFloat(mov.debito.toString());
            }
        });
        const sortedData = Object.keys(groupedData).sort((a, b) => {
            const dateA = new Date(a.split('/').reverse().join('-'));
            const dateB = new Date(b.split('/').reverse().join('-'));
            return dateA.getTime() - dateB.getTime();
        }).map(date => ({
            name: date,
            entrada: parseFloat(groupedData[date].entrada.toFixed(2)),
            saida: parseFloat(groupedData[date].saida.toFixed(2))
        }));

        return sortedData
    };

    useEffect(() => {
        const data = processarMovimentacoes(movimentacoes);
        setData(data);
    }, [movimentacoes]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="saida" fill={saidaGraficos} activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="entrada" fill={entradaGraficos} activeBar={<Rectangle fill="gold" stroke="purple" />} />
                <p>oi</p>
            </BarChart>
        </ResponsiveContainer>
    );
}
