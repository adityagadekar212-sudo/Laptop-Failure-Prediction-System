/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HardwareMetrics, MetricHistoryPoint } from '../types/index.ts';

// Standard baseline demo values strictly aligned with user specifications
export const INITIAL_HARDWARE_METRICS: HardwareMetrics = {
  cpuUsage: 34.2,
  cpuTemp: 54.0,
  gpuUsage: 8.0,
  gpuTemp: 47.0,
  ramUsage: 61.4,
  ssdTemp: 43.0,
  batteryLevel: 86,
  fanSpeed: 2100.0,
};

// 10-point historical trend ending in the current values
export const SAMPLE_CHART_HISTORY: MetricHistoryPoint[] = [
  { time: '10:15', cpuUsage: 28.5, ramUsage: 55.0, cpuTemp: 49.0, gpuTemp: 44.0, ssdTemp: 40.0, fanSpeed: 1850 },
  { time: '10:20', cpuUsage: 31.0, ramUsage: 56.4, cpuTemp: 51.5, gpuTemp: 45.2, ssdTemp: 41.0, fanSpeed: 1900 },
  { time: '10:25', cpuUsage: 45.8, ramUsage: 59.1, cpuTemp: 58.0, gpuTemp: 48.0, ssdTemp: 42.0, fanSpeed: 2300 },
  { time: '10:30', cpuUsage: 52.4, ramUsage: 63.8, cpuTemp: 62.5, gpuTemp: 50.1, ssdTemp: 44.5, fanSpeed: 2550 },
  { time: '10:35', cpuUsage: 38.0, ramUsage: 62.0, cpuTemp: 57.0, gpuTemp: 48.4, ssdTemp: 44.0, fanSpeed: 2250 },
  { time: '10:40', cpuUsage: 29.5, ramUsage: 60.5, cpuTemp: 53.0, gpuTemp: 46.0, ssdTemp: 43.2, fanSpeed: 2000 },
  { time: '10:45', cpuUsage: 34.2, ramUsage: 61.4, cpuTemp: 54.0, gpuTemp: 47.0, ssdTemp: 43.0, fanSpeed: 2100 },
];

export interface DemoPreset {
  id: string;
  name: string;
  description: string;
  data: HardwareMetrics;
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'baseline',
    name: 'Normal (Project Baseline)',
    description: 'Optimal operating temperatures, low CPU/GPU load, nominal fan speed.',
    data: { ...INITIAL_HARDWARE_METRICS },
  },
  {
    id: 'heavy_load',
    name: 'Heavy Load / Warning',
    description: 'High CPU/RAM utilization with elevated temps; fan ramping up.',
    data: {
      cpuUsage: 88.5,
      cpuTemp: 78.5,
      gpuUsage: 65.0,
      gpuTemp: 71.0,
      ramUsage: 91.2,
      ssdTemp: 56.0,
      batteryLevel: 42,
      fanSpeed: 3800,
    },
  },
  {
    id: 'thermal_throttling',
    name: 'Severe Overheating / High Risk',
    description: 'CPU temp > 92°C with fan failure or heavy dust obstruction.',
    data: {
      cpuUsage: 96.0,
      cpuTemp: 94.5,
      gpuUsage: 89.0,
      gpuTemp: 88.0,
      ramUsage: 88.0,
      ssdTemp: 68.0,
      batteryLevel: 18,
      fanSpeed: 1100, // Dangerously low fan speed for high temps!
    },
  },
  {
    id: 'fan_failure',
    name: 'Hardware Fan Failure',
    description: 'Fan stopped (0 RPM) while temperatures rise rapidly.',
    data: {
      cpuUsage: 72.0,
      cpuTemp: 89.0,
      gpuUsage: 45.0,
      gpuTemp: 79.0,
      ramUsage: 74.0,
      ssdTemp: 63.0,
      batteryLevel: 55,
      fanSpeed: 0,
    },
  },
  {
    id: 'battery_degradation',
    name: 'Critical Battery & Thermal Strain',
    description: 'Battery near empty (5%) with elevated internal temperatures.',
    data: {
      cpuUsage: 65.0,
      cpuTemp: 76.0,
      gpuUsage: 30.0,
      gpuTemp: 68.0,
      ramUsage: 82.0,
      ssdTemp: 52.0,
      batteryLevel: 5,
      fanSpeed: 3200,
    },
  },
];
