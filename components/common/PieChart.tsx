import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PieChartProps {
  score: number;
  color: string;
}

const AtsPieChart: React.FC<PieChartProps> = ({ score, color }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const COLORS = [color, '#E5E7EB']; // Main color and a neutral gray for the rest

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={65}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AtsPieChart;