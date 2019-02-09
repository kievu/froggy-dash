import React from 'react';
import { Legend, Tooltip, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Nødvendig', value: 500 },
  { name: 'Spart', value: 140 },
  { name: 'Kunne spart', value: 270 },
];
const COLORS = ['rgb(216, 216, 216)', 'rgb(62, 110, 113)', 'rgb(53, 53, 53)'];

const SimplePieChart = () => (
  <PieChart width={400} height={240}>
    <Legend />
    <Tooltip />
    <Pie data={data} labelLine={false} outerRadius={70} fill="#8884d8">
      {data.map((entry, index) => (
        <Cell fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
);

export default SimplePieChart;
