/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Copy,
  Check,
  Download,
  ArrowRight,
  Terminal,
  Activity,
  Cpu,
  Thermometer,
  Layers,
  HardDrive,
  Database,
  BatteryCharging,
  Fan,
  RefreshCw,
} from 'lucide-react';
import { HardwareMetrics, MetricHistoryPoint } from '../types/index.ts';
import { SAMPLE_CHART_HISTORY } from '../utils/sampleData.ts';

interface MonitoringPageProps {
  metrics: HardwareMetrics;
  onNavigateToPrediction: () => void;
  onRefreshMetrics: () => void;
}

export const MonitoringPage: React.FC<MonitoringPageProps> = ({
  metrics,
  onNavigateToPrediction,
  onRefreshMetrics,
}) => {
  const [copied, setCopied] = useState(false);
  const [currentISOString, setCurrentISOString] = useState<string>('');

  useEffect(() => {
    // Generate ISO timestamp without milliseconds, e.g. 2026-10-21T08:15:30
    const updateTimestamp = () => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const year = now.getFullYear();
      const month = pad(now.getMonth() + 1);
      const day = pad(now.getDate());
      const hours = pad(now.getHours());
      const minutes = pad(now.getMinutes());
      const seconds = pad(now.getSeconds());
      setCurrentISOString(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);
    return () => clearInterval(interval);
  }, []);

  // Exact system report string matching requirement
  const formattedReport = `================================================
TIME: ${currentISOString || '2026-10-21T01:12:05'}

CPU        : ${metrics.cpuUsage.toFixed(1)}%
CPU Temp   : ${metrics.cpuTemp.toFixed(1)}°C
GPU        : ${metrics.gpuUsage.toFixed(1)}%
GPU Temp   : ${metrics.gpuTemp.toFixed(1)}°C
RAM        : ${metrics.ramUsage.toFixed(1)}%
SSD Temp   : ${metrics.ssdTemp.toFixed(1)}°C
Battery    : ${Math.round(metrics.batteryLevel)}%
Fan RPM    : ${metrics.fanSpeed.toFixed(1)}
================================================`;

  const handleCopyReport = () => {
    navigator.clipboard.writeText(formattedReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    const blob = new Blob([formattedReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `laptopguard_report_${currentISOString || 'telemetry'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Recharts history data ending with the current metric values
  const chartData: MetricHistoryPoint[] = [
    ...SAMPLE_CHART_HISTORY.slice(0, SAMPLE_CHART_HISTORY.length - 1),
    {
      time: 'Current',
      cpuUsage: metrics.cpuUsage,
      ramUsage: metrics.ramUsage,
      cpuTemp: metrics.cpuTemp,
      gpuTemp: metrics.gpuTemp,
      ssdTemp: metrics.ssdTemp,
      fanSpeed: metrics.fanSpeed,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Hardware Monitoring & Telemetry
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600 border border-slate-200">
              Page 2
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Diagnostic system report and multi-sensor trend history
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefreshMetrics}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Slightly perturb sample sensor telemetry"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Sample Refresh</span>
          </button>

          <button
            onClick={onNavigateToPrediction}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer group"
          >
            <span>Check Failure Prediction</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Row 1: System Report Log Box & Metric Quick Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Readable System Report (Requested exact format) */}
        <div className="lg:col-span-6 bg-slate-900 rounded-xl p-5 shadow-xs border border-slate-800 text-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200 tracking-wide">
                  Readable System Report
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyReport}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors cursor-pointer"
                  title="Copy Report to Clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors cursor-pointer"
                  title="Download .txt Report"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Terminal Preformatted Output */}
            <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800/80 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto selection:bg-emerald-950 selection:text-emerald-300">
              <pre className="whitespace-pre">{formattedReport}</pre>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Encoding: UTF-8 / Standard ASCII Log</span>
            <span className="text-slate-500 font-mono">Timestamp: Dynamic</span>
          </div>
        </div>

        {/* Real-time Hardware Overview Table / Cards */}
        <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Live Hardware Telemetry Breakdown</h3>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Sample Readings</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-700">CPU Usage</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {metrics.cpuUsage.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-400 w-16 text-right">0–100%</span>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Thermometer className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-700">CPU Temperature</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {metrics.cpuTemp.toFixed(1)}°C
                </span>
                <span className="text-[10px] text-slate-400 w-16 text-right">Limit 85°C</span>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-700">GPU Usage</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {metrics.gpuUsage.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-400 w-16 text-right">0–100%</span>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Thermometer className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-700">GPU Temperature</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {metrics.gpuTemp.toFixed(1)}°C
                </span>
                <span className="text-[10px] text-slate-400 w-16 text-right">Limit 80°C</span>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <HardDrive className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-700">RAM Usage</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {metrics.ramUsage.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-400 w-16 text-right">0–100%</span>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-700">SSD Temperature</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {metrics.ssdTemp.toFixed(1)}°C
                </span>
                <span className="text-[10px] text-slate-400 w-16 text-right">Limit 65°C</span>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BatteryCharging className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-700">Battery Level</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {Math.round(metrics.batteryLevel)}%
                </span>
                <span className="text-[10px] text-slate-400 w-16 text-right">Discharging</span>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Fan className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-700">Fan RPM</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {metrics.fanSpeed.toFixed(1)}
                </span>
                <span className="text-[10px] text-slate-400 w-16 text-right">Nominal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Telemetry Line Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: CPU & RAM Utilization History (%) */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Processing Load History (CPU vs RAM %)
                </h3>
                <p className="text-xs text-slate-500">
                  Resource consumption trend over recent intervals
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">% Load</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                      border: 'none',
                    }}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                  <Line
                    type="monotone"
                    dataKey="cpuUsage"
                    name="CPU Usage (%)"
                    stroke="#2563eb"
                    strokeWidth={2.2}
                    dot={{ r: 3, fill: '#2563eb' }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ramUsage"
                    name="RAM Usage (%)"
                    stroke="#8b5cf6"
                    strokeWidth={2.2}
                    dot={{ r: 3, fill: '#8b5cf6' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>CPU Peak: {Math.max(...chartData.map((d) => d.cpuUsage)).toFixed(1)}%</span>
            <span>RAM Peak: {Math.max(...chartData.map((d) => d.ramUsage)).toFixed(1)}%</span>
          </div>
        </div>

        {/* Chart 2: Thermal History (CPU, GPU, SSD Temp °C) */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Thermal Sensor History (°C)
                </h3>
                <p className="text-xs text-slate-500">
                  CPU, GPU, and SSD temperature sensor progression
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">°Celsius</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    domain={[30, 95]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                      border: 'none',
                    }}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                  <Line
                    type="monotone"
                    dataKey="cpuTemp"
                    name="CPU Temp (°C)"
                    stroke="#ef4444"
                    strokeWidth={2.2}
                    dot={{ r: 3, fill: '#ef4444' }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="gpuTemp"
                    name="GPU Temp (°C)"
                    stroke="#f59e0b"
                    strokeWidth={2.2}
                    dot={{ r: 3, fill: '#f59e0b' }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ssdTemp"
                    name="SSD Temp (°C)"
                    stroke="#10b981"
                    strokeWidth={2.2}
                    dot={{ r: 3, fill: '#10b981' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Thermal Warning: 75°C+</span>
            <span>Safety Cutoff: 95°C+</span>
          </div>
        </div>
      </div>
    </div>
  );
};
