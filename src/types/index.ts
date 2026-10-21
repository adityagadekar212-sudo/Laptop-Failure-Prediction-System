/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HardwareMetrics {
  cpuUsage: number; // percentage
  cpuTemp: number; // Celsius
  gpuUsage: number; // percentage
  gpuTemp: number; // Celsius
  ramUsage: number; // percentage
  ssdTemp: number; // Celsius
  batteryLevel: number; // percentage
  fanSpeed: number; // RPM
}

export type HealthStatus = 'Healthy' | 'Warning' | 'High Risk';
export type SystemHealthLabel = 'Good' | 'Fair' | 'Critical';
export type FailureRiskLabel = 'Low' | 'Moderate' | 'Critical';

export interface PredictionResult {
  status: HealthStatus;
  riskScore: number; // Estimated demo risk percentage 0-100%
  summary: string;
  explanation: string;
  flaggedParameters: {
    parameter: string;
    currentValue: string;
    threshold: string;
    severity: 'normal' | 'warning' | 'critical';
    message: string;
  }[];
  recommendations: string[];
}

export interface MetricHistoryPoint {
  time: string;
  cpuUsage: number;
  ramUsage: number;
  cpuTemp: number;
  gpuTemp: number;
  ssdTemp: number;
  fanSpeed: number;
}
