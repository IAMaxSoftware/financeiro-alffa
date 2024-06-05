import { entradaGraficos, saidaGraficos } from '@/app/functions/utils';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '01/04/2024',
        entrada: 1000,
        saida: 2400,
    },
    {
        name: '02/04/2024',
        entrada: 2000,
        saida: 400.80,
    },
    {
        name: '03/04/2024',
        entrada: 5000,
        saida: 2000,
    },
    {
        name: '04/04/2024',
        entrada: 0,
        saida: 500,
    },
    {
        name: '05/04/2024',
        entrada: 200,
        saida: 250,
    },
    {
        name: '06/04/2024',
        entrada: 10000,
        saida: 2254,
    },
];

export default function EntradasSaidasBarras() {

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
