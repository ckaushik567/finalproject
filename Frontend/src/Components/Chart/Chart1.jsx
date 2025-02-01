import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';

const data = [
  { date: 'Mobile', value: 1234 },
  { date: 'Desktop', value: 1140 },
  { date: 'Tablet', value: 134 },
];

const HorizontalBarChart1 = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3 style={{ textAlign: 'left', color: '#0000FF', marginBottom: 10 }}>Date-wise Clicks</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, left: 20, right: 30, bottom: 10 }}
        >
          {/* X-Axis hidden */}
          <XAxis type="number" hide />
          {/* Y-Axis for Dates */}
          <YAxis
            type="category"
            dataKey="date"
            axisLine={false}
            tickLine={false}
            width={80} // Adjusts the space for the dates
            tick={{ fontSize: 12, fill: '#000' }}
          />
          {/* Bars */}
          <Bar dataKey="value" fill="#0000FF" barSize={20}>
            {/* Labels at the end of the bars */}
            <LabelList
              dataKey="value"
              position="right"
              style={{ fill: '#000', fontSize: 12 }}
              offset={10}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart1;
