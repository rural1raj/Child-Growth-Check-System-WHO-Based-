
import React from 'react';
import { Gender, GrowthDataPoint } from './types';
import { GROWTH_DATA } from './constants';

interface GrowthChartProps {
  label: string;
  unit: string;
  childAge: number;
  childValue: number;
  gender: Gender;
  type: 'weight' | 'height';
}

const GrowthChart: React.FC<GrowthChartProps> = ({ label, unit, childAge, childValue, gender, type }) => {
  const data = GROWTH_DATA[gender];
  const padding = 40;
  const width = 300;
  const height = 200;

  // Calculate scales
  const maxAge = 60;
  const values = data.map(d => type === 'weight' ? d.weightMedian : d.heightMedian);
  const minValue = Math.min(...values, childValue) * 0.8;
  const maxValue = Math.max(...values, childValue) * 1.1;

  const xScale = (age: number) => padding + (age / maxAge) * (width - 2 * padding);
  const yScale = (val: number) => height - padding - ((val - minValue) / (maxValue - minValue)) * (height - 2 * padding);

  // Generate path for the median curve
  const points = data.map(d => ({
    x: xScale(d.ageInMonths),
    y: yScale(type === 'weight' ? d.weightMedian : d.heightMedian)
  }));

  const pathD = points.reduce((acc, p, i) => 
    i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, ""
  );

  const childX = xScale(childAge);
  const childY = yScale(childValue);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-600 mb-2 text-center">{label} ({unit}) चार्ट</h3>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#cbd5e1" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#cbd5e1" strokeWidth="2" />
        
        {/* WHO Median Curve */}
        <path d={pathD} fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 2" />
        
        {/* Labels for axes */}
        <text x={width / 2} y={height - 5} textAnchor="middle" fontSize="10" fill="#64748b">आयु (महीने)</text>
        <text x={10} y={height / 2} textAnchor="middle" fontSize="10" fill="#64748b" transform={`rotate(-90, 10, ${height / 2})`}>{unit}</text>

        {/* Child Point */}
        <circle cx={childX} cy={childY} r="6" fill="#ea580c" className="animate-pulse" />
        <text x={childX} y={childY - 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ea580c">
          बच्चा
        </text>

        {/* Legend */}
        <g transform={`translate(${width - 100}, ${padding})`}>
           <line x1="0" y1="0" x2="15" y2="0" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
           <text x="20" y="4" fontSize="8" fill="#64748b">WHO औसत</text>
        </g>
      </svg>
    </div>
  );
};

export default GrowthChart;
