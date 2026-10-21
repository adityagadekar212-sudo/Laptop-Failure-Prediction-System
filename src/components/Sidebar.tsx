/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Activity, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';
import { HardwareMetrics } from '../types/index.ts';
import { DEMO_PRESETS } from '../utils/sampleData.ts';

export type PageId = 'dashboard' | 'monitoring' | 'prediction';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onSelectPreset: (metrics: HardwareMetrics) => void;
  currentMetrics: HardwareMetrics;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  onSelectPreset,
}) => {
  const navItems = [
    {
      id: 'dashboard' as PageId,
      name: 'Dashboard',
      description: 'System health summary & primary metrics',
      icon: LayoutDashboard,
      pageNumber: 'Page 1',
    },
    {
      id: 'monitoring' as PageId,
      name: 'Hardware Monitoring',
      description: 'Diagnostic report & telemetry charts',
      icon: Activity,
      pageNumber: 'Page 2',
    },
    {
      id: 'prediction' as PageId,
      name: 'Failure Prediction',
      description: 'Predictive risk scoring & parameter analysis',
      icon: AlertTriangle,
      pageNumber: 'Page 3',
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
      <div>
        {/* Navigation list */}
        <div className="p-4 border-b border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-blue-50/80 text-blue-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mt-0.5 shrink-0 ${
                      isActive ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{item.pageNumber}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-normal truncate">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Demo Presets (for easy college presentation!) */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2 px-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Demo Test Presets
            </p>
            <span className="text-[10px] text-blue-600 font-mono">Viva Demo</span>
          </div>
          <p className="text-xs text-slate-500 mb-2.5 px-1 leading-relaxed">
            Quickly switch simulated sensor states during presentation:
          </p>
          <div className="space-y-1.5">
            {DEMO_PRESETS.slice(0, 4).map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset.data)}
                className="w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <span className="truncate">{preset.name}</span>
                <span className="text-[10px] text-slate-400 font-mono group-hover:text-blue-600 transition-colors">
                  Load
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* College Project Meta info */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-xs font-semibold text-slate-800">Academic Project</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-normal mb-2">
          LAPTOPGUARD AI — Predictive failure diagnosis for edge laptop hardware.
        </p>
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200/60">
          <span>v1.0 (Demo Mode)</span>
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-emerald-600" />
            <span>Ready</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
