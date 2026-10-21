/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Cpu,
  Thermometer,
  Layers,
  HardDrive,
  Database,
  BatteryCharging,
  Fan,
  Flame,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { HardwareMetrics, PredictionResult } from '../types/index.ts';
import { MetricCard } from '../components/MetricCard.tsx';

interface DashboardPageProps {
  metrics: HardwareMetrics;
  prediction: PredictionResult;
  onNavigateToMonitoring: () => void;
  onNavigateToPrediction: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  metrics,
  prediction,
  onNavigateToMonitoring,
  onNavigateToPrediction,
}) => {
  // Determine overall status colors and text
  const isHealthy = prediction.status === 'Healthy';
  const isWarning = prediction.status === 'Warning';
  const isCritical = prediction.status === 'High Risk';

  // System Health label
  const systemHealthText = isHealthy ? 'Good' : isWarning ? 'Fair' : 'Critical';
  const failureRiskText = isHealthy ? 'Low' : isWarning ? 'Moderate' : 'Critical';
  const predictionStatusText = isHealthy
    ? 'No Immediate Failure Detected'
    : isWarning
    ? 'Warning — Attention Recommended'
    : 'Critical — High Failure Probability';

  const statusStyle = isHealthy
    ? {
        border: 'border-emerald-200',
        bg: 'bg-emerald-50/70',
        badgeBg: 'bg-emerald-100 text-emerald-800',
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-100',
        progressBar: 'bg-emerald-500',
      }
    : isWarning
    ? {
        border: 'border-amber-200',
        bg: 'bg-amber-50/70',
        badgeBg: 'bg-amber-100 text-amber-800',
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-100',
        progressBar: 'bg-amber-500',
      }
    : {
        border: 'border-rose-200',
        bg: 'bg-rose-50/70',
        badgeBg: 'bg-rose-100 text-rose-800',
        iconColor: 'text-rose-600',
        iconBg: 'bg-rose-100',
        progressBar: 'bg-rose-600',
      };

  return (
    <div className="space-y-6">
      {/* Page Title & Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              LAPTOPGUARD AI
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600 border border-slate-200">
              Page 1
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Laptop Health Monitoring & Failure Prediction
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNavigateToMonitoring}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer group"
          >
            <span>View Detailed Monitoring</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Health Status Overview Card */}
      <div className={`rounded-xl p-5 sm:p-6 border ${statusStyle.border} ${statusStyle.bg} shadow-xs transition-all`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${statusStyle.iconBg} ${statusStyle.iconColor} shrink-0`}>
              {isHealthy ? (
                <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
              ) : isWarning ? (
                <AlertTriangle className="w-8 h-8 stroke-[2.2]" />
              ) : (
                <XCircle className="w-8 h-8 stroke-[2.2]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Comprehensive Diagnostic Assessment
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-md font-semibold ${statusStyle.badgeBg}`}>
                  {prediction.status}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                {predictionStatusText}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {prediction.summary}
              </p>
            </div>
          </div>

          {/* 3 Metric Pills: System Health, Failure Risk, Risk Score */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0 lg:border-l lg:border-slate-300/60 lg:pl-6">
            <div className="bg-white/90 p-3 rounded-lg border border-slate-200/80 shadow-2xs">
              <p className="text-[11px] font-medium text-slate-500">System Health</p>
              <p className="text-base font-bold text-slate-900 mt-0.5">{systemHealthText}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Overall condition</p>
            </div>

            <div className="bg-white/90 p-3 rounded-lg border border-slate-200/80 shadow-2xs">
              <p className="text-[11px] font-medium text-slate-500">Failure Risk</p>
              <p className="text-base font-bold text-slate-900 mt-0.5">{failureRiskText}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Predicted hazard</p>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-white/90 p-3 rounded-lg border border-slate-200/80 shadow-2xs">
              <p className="text-[11px] font-medium text-slate-500">Demo Risk Score</p>
              <p className="text-base font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                {prediction.riskScore}%
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Estimated score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header for 8 Hardware Parameters */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Hardware Parameters & Telemetry Readings
            </h3>
            <p className="text-xs text-slate-500">
              Sample sensor data values configured for demonstration
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">8 Active Parameters</span>
        </div>

        {/* 8 Hardware Parameters Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. CPU Usage: 34.2% */}
          <MetricCard
            title="CPU Usage"
            value={metrics.cpuUsage.toFixed(1)}
            unit="%"
            icon={Cpu}
            subtext="Baseline demo: 34.2%"
            progressPercent={metrics.cpuUsage}
            status={metrics.cpuUsage > 85 ? 'critical' : metrics.cpuUsage > 70 ? 'warning' : 'normal'}
          />

          {/* 2. CPU Temperature: 54°C */}
          <MetricCard
            title="CPU Temperature"
            value={metrics.cpuTemp.toFixed(1)}
            unit="°C"
            icon={Thermometer}
            subtext="Baseline demo: 54.0°C"
            progressPercent={(metrics.cpuTemp / 100) * 100}
            status={metrics.cpuTemp >= 85 ? 'critical' : metrics.cpuTemp >= 75 ? 'warning' : 'normal'}
          />

          {/* 3. GPU Usage: 8% */}
          <MetricCard
            title="GPU Usage"
            value={metrics.gpuUsage.toFixed(1)}
            unit="%"
            icon={Layers}
            subtext="Baseline demo: 8.0%"
            progressPercent={metrics.gpuUsage}
            status={metrics.gpuUsage > 85 ? 'critical' : metrics.gpuUsage > 70 ? 'warning' : 'normal'}
          />

          {/* 4. GPU Temperature: 47°C */}
          <MetricCard
            title="GPU Temperature"
            value={metrics.gpuTemp.toFixed(1)}
            unit="°C"
            icon={Flame}
            subtext="Baseline demo: 47.0°C"
            progressPercent={(metrics.gpuTemp / 100) * 100}
            status={metrics.gpuTemp >= 80 ? 'critical' : metrics.gpuTemp >= 70 ? 'warning' : 'normal'}
          />

          {/* 5. RAM Usage: 61.4% */}
          <MetricCard
            title="RAM Usage"
            value={metrics.ramUsage.toFixed(1)}
            unit="%"
            icon={HardDrive}
            subtext="Baseline demo: 61.4%"
            progressPercent={metrics.ramUsage}
            status={metrics.ramUsage >= 90 ? 'critical' : metrics.ramUsage >= 80 ? 'warning' : 'normal'}
          />

          {/* 6. SSD Temperature: 43°C */}
          <MetricCard
            title="SSD Temperature"
            value={metrics.ssdTemp.toFixed(1)}
            unit="°C"
            icon={Database}
            subtext="Baseline demo: 43.0°C"
            progressPercent={(metrics.ssdTemp / 80) * 100}
            status={metrics.ssdTemp >= 65 ? 'critical' : metrics.ssdTemp >= 52 ? 'warning' : 'normal'}
          />

          {/* 7. Battery Level: 86% */}
          <MetricCard
            title="Battery Level"
            value={Math.round(metrics.batteryLevel)}
            unit="%"
            icon={BatteryCharging}
            subtext="Baseline demo: 86%"
            progressPercent={metrics.batteryLevel}
            status={metrics.batteryLevel <= 10 ? 'critical' : metrics.batteryLevel <= 25 ? 'warning' : 'normal'}
          />

          {/* 8. Fan Speed: 2100 RPM */}
          <MetricCard
            title="Fan Speed"
            value={Math.round(metrics.fanSpeed)}
            unit="RPM"
            icon={Fan}
            subtext="Baseline demo: 2100 RPM"
            progressPercent={(metrics.fanSpeed / 5000) * 100}
            status={
              metrics.fanSpeed === 0 && metrics.cpuTemp > 65
                ? 'critical'
                : metrics.fanSpeed > 4500
                ? 'warning'
                : 'normal'
            }
          />
        </div>
      </div>

      {/* Quick Navigation and Callout Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Ready to analyze telemetry trends or simulate custom stress?
            </h4>
            <p className="text-xs text-slate-500">
              Explore full historical graphs in Page 2 or run predictive threshold checks in Page 3.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={onNavigateToMonitoring}
            className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer text-center"
          >
            Hardware Monitoring (Page 2)
          </button>
          <button
            onClick={onNavigateToPrediction}
            className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer text-center"
          >
            Failure Prediction (Page 3)
          </button>
        </div>
      </div>
    </div>
  );
};
