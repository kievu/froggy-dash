import React from 'react';
import {
  ResponsiveContainer,
  Brush,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
} from 'recharts';

const LightAndMovementChart = ({ data }) => {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={200}>
      <BarChart
        width={600}
        height={200}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barGap={0}
        barCategoryGap={0}
      >
        <XAxis type="category" dataKey="timestamp" />
        <Tooltip />
        <Legend />
        <Brush height={20} />
        <Bar dataKey="motion" fill="#8884d8" stackId="a" />
        <Bar dataKey="light" fill="#82ca9d" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LightAndMovementChart;
