import React from 'react';
import { Legend, Tooltip, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SimplePieChart = () => (
  <PieChart width={400} height={200}>
    <Legend />
    <Tooltip />
    <Pie data={data} labelLine={false} outerRadius={80} fill="#8884d8">
      {data.map((entry, index) => (
        <Cell fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
);

export default SimplePieChart;
