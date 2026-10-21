/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Clock, BookOpen, Laptop } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  activePageTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGuide, activePageTitle }) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: YYYY-MM-DD HH:mm:ss with weekday
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentDateTime(now.toLocaleDateString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Breadcrumb */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
                LAPTOPGUARD AI
              </h1>
              <span className="hidden sm:inline-block text-slate-300">/</span>
              <span className="hidden sm:inline-block text-xs font-medium text-slate-600">
                {activePageTitle}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Laptop Health Monitoring & Failure Prediction
            </p>
          </div>
        </div>

        {/* Status Indicators & Presentation Guide */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs">
          {/* Dynamic Date & Time */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 text-slate-700 font-mono tabular-nums border border-slate-200/80">
            <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{currentDateTime || 'Loading time...'}</span>
          </div>

          {/* Demo Mode Notice */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200/60 font-medium">
            <Laptop className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="whitespace-nowrap">Demo Mode — Sample Sensor Data</span>
          </div>

          {/* College Project Guide Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors font-medium whitespace-nowrap cursor-pointer shadow-xs active:scale-[0.98]"
            title="View College Project Presentation Details & Run Instructions"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Project Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
};
