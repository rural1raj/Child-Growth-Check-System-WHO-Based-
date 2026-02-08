
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
  const padding = 45; // Increased padding for better label visibility
  const width = 300;
  const height = 220; // Slightly taller for clarity

  // Calculate scales
  const maxAge = 60;
  const values = data.map(d => type === 'weight' ? d.weightMedian : d.heightMedian);
  const minValue = Math.min(...values, childValue) * 0.75;
  const maxValue = Math.max(...values, childValue) * 1.15;

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

  // Colors
  const medianColor = "#2563eb"; // Distinct Royal Blue
  const childColor = "#e11d48";  // High-contrast Rose/Red
  const axisColor = "#64748b";   // Slate 500 for better contrast against white

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-black text-gray-700 mb-3 text-center border-b border-gray-50 pb-2">
        {label} ({unit}) प्रगति चार्ट
      </h3>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-sm">
        {/* Grid Lines (Horizontal) */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
          const y = padding + p * (height - 2 * padding);
          return <line key={i} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
        })}

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={axisColor} strokeWidth="2" strokeLinecap="round" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke={axisColor} strokeWidth="2" strokeLinecap="round" />
        
        {/* WHO Median Curve */}
        <path d={pathD} fill="none" stroke={medianColor} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* Axis Labels */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill={axisColor}>आयु (महीने)</text>
        <text x={12} y={height / 2} textAnchor="middle" fontSize="10" fontWeight="bold" fill={axisColor} transform={`rotate(-90, 12, ${height / 2})`}>{unit}</text>

        {/* Child Point Halo for better visibility */}
        <circle cx={childX} cy={childY} r="8" fill={childColor} opacity="0.2" className="animate-pulse" />
        {/* Actual Child Point - Fix: removed invalid shadow attribute and used style for filter instead */}
        <circle 
          cx={childX} 
          cy={childY} 
          r="5" 
          fill={childColor} 
          stroke="white" 
          strokeWidth="2" 
          style={{ filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.2))' }}
        />
        
        <text x={childX} y={childY - 12} textAnchor="middle" fontSize="12" fontWeight="900" fill={childColor} style={{ textShadow: '0px 0px 2px white' }}>
          बच्चा
        </text>

        {/* Legend Box */}
        <g transform={`translate(${width - 105}, ${padding - 10})`}>
           <rect x="-5" y="-12" width="100" height="30" rx="4" fill="white" fillOpacity="0.8" />
           <line x1="0" y1="0" x2="15" y2="0" stroke={medianColor} strokeWidth="3" />
           <text x="20" y="4" fontSize="9" fontWeight="bold" fill={medianColor}>WHO औसत</text>
           
           <circle cx="7.5" cy="14" r="3" fill={childColor} />
           <text x="20" y="18" fontSize="9" fontWeight="bold" fill={childColor}>आपका बच्चा</text>
        </g>
      </svg>
    </div>
  );
};

export default GrowthChart;
