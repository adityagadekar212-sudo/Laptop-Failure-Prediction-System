/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PageId, Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { MonitoringPage } from './pages/MonitoringPage.tsx';
import { PredictionPage } from './pages/PredictionPage.tsx';
import { ProjectGuideModal } from './components/ProjectGuideModal.tsx';
import { HardwareMetrics } from './types/index.ts';
import { INITIAL_HARDWARE_METRICS } from './utils/sampleData.ts';
import { predictLaptopFailure } from './utils/predictFailure.ts';
import { LayoutDashboard, Activity, AlertTriangle } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [metrics, setMetrics] = useState<HardwareMetrics>({ ...INITIAL_HARDWARE_METRICS });
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Compute prediction based on current metrics
  const prediction = useMemo(() => {
    return predictLaptopFailure(metrics);
  }, [metrics]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPreset = (newMetrics: HardwareMetrics) => {
    setMetrics({ ...newMetrics });
  };

  const handleRefreshMetrics = () => {
    // Slightly perturb values by ±0.5% or ±0.2°C to simulate active sensor polling
    setMetrics((prev) => ({
      ...prev,
      cpuUsage: Math.max(5, Math.min(99, +(prev.cpuUsage + (Math.random() * 2 - 1)).toFixed(1))),
      cpuTemp: Math.max(30, Math.min(105, +(prev.cpuTemp + (Math.random() * 1.2 - 0.6)).toFixed(1))),
      ramUsage: Math.max(10, Math.min(98, +(prev.ramUsage + (Math.random() * 0.8 - 0.4)).toFixed(1))),
      fanSpeed: Math.max(0, Math.round(prev.fanSpeed + (Math.random() * 60 - 30))),
    }));
  };

  const pageTitles: Record<PageId, string> = {
    dashboard: 'Dashboard (Page 1)',
    monitoring: 'Hardware Monitoring (Page 2)',
    prediction: 'Failure Prediction (Page 3)',
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activePageTitle={pageTitles[currentPage]}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Mobile Top Navigation Pills (Quick navigation for smaller screens) */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto">
        <button
          onClick={() => handleNavigate('dashboard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
            currentPage === 'dashboard'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => handleNavigate('monitoring')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
            currentPage === 'monitoring'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Monitoring</span>
        </button>
        <button
          onClick={() => handleNavigate('prediction')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
            currentPage === 'prediction'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Prediction</span>
        </button>
      </div>

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onSelectPreset={handleSelectPreset}
          currentMetrics={metrics}
        />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {currentPage === 'dashboard' && (
            <DashboardPage
              metrics={metrics}
              prediction={prediction}
              onNavigateToMonitoring={() => handleNavigate('monitoring')}
              onNavigateToPrediction={() => handleNavigate('prediction')}
            />
          )}

          {currentPage === 'monitoring' && (
            <MonitoringPage
              metrics={metrics}
              onNavigateToPrediction={() => handleNavigate('prediction')}
              onRefreshMetrics={handleRefreshMetrics}
            />
          )}

          {currentPage === 'prediction' && (
            <PredictionPage
              initialMetrics={metrics}
              onUpdateGlobalMetrics={(newMetrics) => setMetrics({ ...newMetrics })}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-800">
              LAPTOPGUARD AI — Laptop Failure Prediction System
            </span>{' '}
            <span className="text-slate-400">·</span>{' '}
            <span>College Project Demonstration</span>
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            Demo Mode · Sample Telemetry Baseline: 34.2% CPU / 54°C / 2100 RPM
          </div>
        </div>
      </footer>

      {/* College Project Guide Modal */}
      <ProjectGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
