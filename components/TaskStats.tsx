import React, { PureComponent, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import useFetchAll from '../hooks/useFetchAll';
import { useAppContext } from '../appContext';

interface Task {
    status: string;
}

interface ChartData {
    name: string;
    value: number;
}

interface ActiveShapeProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: ChartData;
    percent: number;
    value: number;
}

const failedData=[
    {
        name: "No data",
        value: 500
    },
    {
        name: "No data",
        value: 250
    },
    {
        name: "No data",
        value: 250
    },
]

const statsData = [
    'Completed',
    'In progress',
    'Failed',
];
const COLORS = ['#4CAF50', '#FF9800', '#F44336']; // Green for Completed, Orange for In progress, and Red for Failed

const renderActiveShape = (props: ActiveShapeProps) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const TaskStats: React.FC = () => {
    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    const { data, refetch } = useFetchAll();
    const context = useAppContext();

    useEffect(() => {
        refetch();
    }, [context?.fetchDep]);

    const totalLength = data.length;
    const AllChartData: ChartData[] = statsData.map((stat) => {
        const ArrLength = data.filter(task => task.status.toLowerCase() === stat.toLowerCase()).length;
        const Percentage = (parseFloat(((ArrLength / totalLength) * 100).toFixed(2))) * 100;
        return {
            name: stat,
            value: Percentage
        };
    });

    const onPieEnter = (_: React.MouseEvent, index: number) => {
        setActiveIndex(index);
    };

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                { data.length?(<PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        //@ts-ignore
                        activeShape={renderActiveShape}
                        data={AllChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {AllChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>):(
                    <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        //@ts-ignore
                        activeShape={renderActiveShape}
                        data={failedData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {failedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} className=' fill-slate-200' />
                        ))}
                    </Pie>
                </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default TaskStats;
