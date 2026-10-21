/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  subtext?: string;
  status?: 'normal' | 'warning' | 'critical';
  progressPercent?: number;
  highlight?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  subtext,
  status = 'normal',
  progressPercent,
  highlight = false,
}) => {
  const statusColors = {
    normal: {
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-700',
      iconBg: 'bg-emerald-100/70 text-emerald-700',
      bar: 'bg-emerald-500',
      border: highlight ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-200',
    },
    warning: {
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-800',
      iconBg: 'bg-amber-100 text-amber-700',
      bar: 'bg-amber-500',
      border: highlight ? 'border-amber-400 ring-2 ring-amber-100' : 'border-amber-200',
    },
    critical: {
      badgeBg: 'bg-rose-50',
      badgeText: 'text-rose-700',
      iconBg: 'bg-rose-100 text-rose-700',
      bar: 'bg-rose-600',
      border: highlight ? 'border-rose-400 ring-2 ring-rose-100' : 'border-rose-200',
    },
  };

  const currentTheme = statusColors[status];

  return (
    <div
      className={`bg-white rounded-xl p-5 border ${currentTheme.border} shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500 tracking-wide">{title}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {value}
            </span>
            {unit && <span className="text-sm font-semibold text-slate-600 font-sans">{unit}</span>}
          </div>
        </div>

        <div className={`p-2.5 rounded-lg shrink-0 ${currentTheme.iconBg}`}>
          <Icon className="w-5 h-5 stroke-[2]" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        {progressPercent !== undefined && (
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${currentTheme.bar}`}
              style={{ width: `${Math.min(Math.max(progressPercent, 0), 100)}%` }}
            />
          </div>
        )}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-normal">{subtext || 'Nominal range'}</span>
          <span className={`font-medium ${currentTheme.badgeText}`}>
            {status === 'normal' ? 'Normal' : status === 'warning' ? 'Elevated' : 'Critical'}
          </span>
        </div>
      </div>
    </div>
  );
};
