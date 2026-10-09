import React, { useState } from 'react';
import type { DashboardSummary } from '../types';

interface RevenueChartProps {
  data: DashboardSummary['revenueHistory'];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-xs text-[#7B8794]">No billing data recorded</div>;
  }

  const height = 220;
  const width = 520;
  const padding = { top: 20, right: 20, bottom: 30, left: 45 };

  const maxVal = Math.max(...data.map((d) => Math.max(d.revenue, d.target))) * 1.15;
  const minVal = 0;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * (width - padding.left - padding.right);
    const y = height - padding.bottom - ((d.revenue - minVal) / (maxVal - minVal)) * (height - padding.top - padding.bottom);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible select-none"
      >
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6B91A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F6B91A" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.33, 0.66, 1].map((pct, i) => {
          const y = height - padding.bottom - pct * (height - padding.top - padding.bottom);
          const val = Math.round(minVal + pct * (maxVal - minVal));
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#E9E6DF"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 8}
                y={y + 3}
                textAnchor="end"
                className="text-[10px] fill-[#7B8794] tabular-nums"
              >
                ${(val / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaD} fill="url(#revenueGradient)" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#F6B91A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {points.map((p, i) => (
          <g
            key={i}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            className="cursor-pointer"
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 5.5 : 3.5}
              fill="#FFFFFF"
              stroke="#F6B91A"
              strokeWidth="2.5"
              className="transition-all duration-150"
            />
            {/* X-axis label */}
            <text
              x={p.x}
              y={height - 10}
              textAnchor="middle"
              className={`text-[10px] tabular-nums transition-colors ${
                hoverIndex === i ? 'fill-[#17212B] font-semibold' : 'fill-[#7B8794]'
              }`}
            >
              {p.month.split(' ')[0]}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating Tooltip */}
      {hoverIndex !== null && (
        <div
          className="absolute z-10 pointer-events-none bg-[#17212B] text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg -translate-x-1/2 -translate-y-full mb-2"
          style={{
            left: `${(points[hoverIndex].x / width) * 100}%`,
            top: `${(points[hoverIndex].y / height) * 100}%`,
          }}
        >
          <div className="font-medium text-gray-200">{points[hoverIndex].month}</div>
          <div className="text-sm font-bold text-[#F6B91A] tabular-nums">
            ${points[hoverIndex].revenue.toLocaleString()}
          </div>
          <div className="text-[10px] text-gray-400 tabular-nums">
            Target: ${points[hoverIndex].target.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

interface StatusDonutProps {
  data: DashboardSummary['projectStatusDistribution'];
}

export const StatusDonut: React.FC<StatusDonutProps> = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const total = data.reduce((acc, d) => acc + d.count, 0);

  if (total === 0) {
    return <div className="h-48 flex items-center justify-center text-xs text-[#7B8794]">No project status data</div>;
  }

  const size = 150;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <div className="relative w-[150px] h-[150px] shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90 select-none">
          {data.map((item, i) => {
            if (item.count === 0) return null;
            const percent = item.count / total;
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -(accumulatedPercent * circumference);
            accumulatedPercent += percent;

            return (
              <circle
                key={item.status}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={hoverIndex === i ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-[#17212B] tabular-nums">
            {hoverIndex !== null ? data[hoverIndex].count : total}
          </span>
          <span className="text-[10px] text-[#7B8794] uppercase tracking-wide">
            {hoverIndex !== null ? data[hoverIndex].label : 'Projects'}
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="flex flex-col gap-2 min-w-[130px]">
        {data.map((item, i) => (
          <div
            key={item.status}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`flex items-center justify-between text-xs cursor-pointer p-1 rounded-md transition-colors ${
              hoverIndex === i ? 'bg-[#F7F5F0]' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[#526174]">{item.label}</span>
            </div>
            <span className="font-semibold text-[#17212B] tabular-nums">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
