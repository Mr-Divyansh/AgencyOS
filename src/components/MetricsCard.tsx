import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  label: string;
  value: string | number;
  comparison?: string;
  positive?: boolean;
  icon: LucideIcon;
  sublabel?: string;
  onClick?: () => void;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  label,
  value,
  comparison,
  positive = true,
  icon: Icon,
  sublabel,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`agency-card p-5 transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:border-[#DAD5CA] hover:shadow-sm' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#526174]">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-[#FFF8E8] flex items-center justify-center text-[#F6B91A] border border-[#FFE6A0]/50">
          <Icon className="w-4 h-4 text-[#C98B00]" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-[#17212B] tabular-nums">
          {value}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs text-[#7B8794]">
        {comparison && (
          <span
            className={`font-medium tabular-nums ${
              positive ? 'text-[#16A36A]' : 'text-[#EF6262]'
            }`}
          >
            {comparison}
          </span>
        )}
        {comparison && sublabel && <span aria-hidden="true">·</span>}
        {sublabel && <span className="truncate">{sublabel}</span>}
      </div>
    </div>
  );
};
