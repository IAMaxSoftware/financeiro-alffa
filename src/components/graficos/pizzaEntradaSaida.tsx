import { entradaGraficos, saidaGraficos } from '@/app/app/functions/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { name: 'Saidas', value: 400 },
    { name: 'Entradas', value: 300 }
];

const COLORS = [saidaGraficos, entradaGraficos];

const RADIAN = Math.PI / 180;

interface customizadeLabel {
    cx: number,
    cy: number,
    midAngle: number,
    innerRadius: number,
    outerRadius: number,
    percent: number,
    index: number
}


const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: customizadeLabel) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function PizzaEntradaSaida() {


    return (
        <div className='flex flex-col h-full'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend
                        payload={
                            data.map(
                                (item, index) => ({
                                    id: item.name,
                                    type: "square",
                                    value: `${item.name} R$ ${item.value}`,
                                    color: COLORS[index % COLORS.length]
                                })
                            )
                        } />
                </PieChart>

            </ResponsiveContainer>
        </div>
    );
}
