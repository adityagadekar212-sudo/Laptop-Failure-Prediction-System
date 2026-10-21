/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HardwareMetrics, PredictionResult } from '../types/index.ts';

export interface ValidationIssue {
  field: keyof HardwareMetrics;
  message: string;
}

/**
 * Validates whether the user-supplied hardware metrics are within reasonable physical ranges.
 */
export function validateHardwareMetrics(metrics: HardwareMetrics): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (isNaN(metrics.cpuUsage) || metrics.cpuUsage < 0 || metrics.cpuUsage > 100) {
    issues.push({ field: 'cpuUsage', message: 'CPU Usage must be between 0% and 100%' });
  }

  if (isNaN(metrics.cpuTemp) || metrics.cpuTemp < 10 || metrics.cpuTemp > 125) {
    issues.push({ field: 'cpuTemp', message: 'CPU Temperature must be between 10°C and 125°C' });
  }

  if (isNaN(metrics.gpuUsage) || metrics.gpuUsage < 0 || metrics.gpuUsage > 100) {
    issues.push({ field: 'gpuUsage', message: 'GPU Usage must be between 0% and 100%' });
  }

  if (isNaN(metrics.gpuTemp) || metrics.gpuTemp < 10 || metrics.gpuTemp > 125) {
    issues.push({ field: 'gpuTemp', message: 'GPU Temperature must be between 10°C and 125°C' });
  }

  if (isNaN(metrics.ramUsage) || metrics.ramUsage < 0 || metrics.ramUsage > 100) {
    issues.push({ field: 'ramUsage', message: 'RAM Usage must be between 0% and 100%' });
  }

  if (isNaN(metrics.ssdTemp) || metrics.ssdTemp < 10 || metrics.ssdTemp > 100) {
    issues.push({ field: 'ssdTemp', message: 'SSD Temperature must be between 10°C and 100°C' });
  }

  if (isNaN(metrics.batteryLevel) || metrics.batteryLevel < 0 || metrics.batteryLevel > 100) {
    issues.push({ field: 'batteryLevel', message: 'Battery Level must be between 0% and 100%' });
  }

  if (isNaN(metrics.fanSpeed) || metrics.fanSpeed < 0 || metrics.fanSpeed > 8000) {
    issues.push({ field: 'fanSpeed', message: 'Fan Speed must be between 0 RPM and 8000 RPM' });
  }

  return issues;
}

/**
 * DEMONSTRATION RULE-BASED PREDICTION LOGIC
 *
 * NOTE FOR COLLEGE PRESENTATION & EVALUATION:
 * In this initial frontend prototype, this function simulates a trained classifier
 * using structured multi-factor threshold analysis on thermal, fan, memory, and battery indicators.
 *
 * FUTURE ML BACKEND REPLACEMENT:
 * This function can be replaced with an async API call to a Python FastAPI / Flask backend:
 *
 * async function predictLaptopFailureML(metrics: HardwareMetrics): Promise<PredictionResult> {
 *   const response = await fetch('http://localhost:5000/api/predict', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(metrics)
 *   });
 *   return await response.json();
 * }
 */
export function predictLaptopFailure(metrics: HardwareMetrics): PredictionResult {
  const flaggedParameters: PredictionResult['flaggedParameters'] = [];
  const recommendations: string[] = [];

  let riskPoints = 0;

  // 1. CPU Temperature Evaluation
  if (metrics.cpuTemp >= 88) {
    riskPoints += 35;
    flaggedParameters.push({
      parameter: 'CPU Temperature',
      currentValue: `${metrics.cpuTemp.toFixed(1)}°C`,
      threshold: '< 80.0°C',
      severity: 'critical',
      message: 'Severe thermal threshold exceeded. CPU is at high risk of thermal throttling or shutdown.',
    });
    recommendations.push('Immediate thermal management needed: inspect thermal paste and cooling heat-pipe.');
  } else if (metrics.cpuTemp >= 75) {
    riskPoints += 18;
    flaggedParameters.push({
      parameter: 'CPU Temperature',
      currentValue: `${metrics.cpuTemp.toFixed(1)}°C`,
      threshold: '< 75.0°C',
      severity: 'warning',
      message: 'Elevated CPU temperature under current workload.',
    });
    recommendations.push('Elevate laptop base or use a cooling pad to improve lower intake airflow.');
  }

  // 2. GPU Temperature Evaluation
  if (metrics.gpuTemp >= 85) {
    riskPoints += 25;
    flaggedParameters.push({
      parameter: 'GPU Temperature',
      currentValue: `${metrics.gpuTemp.toFixed(1)}°C`,
      threshold: '< 78.0°C',
      severity: 'critical',
      message: 'Critical GPU junction temperature detected.',
    });
    recommendations.push('Reduce graphic-intensive tasks and check GPU heat-sink seating.');
  } else if (metrics.gpuTemp >= 74) {
    riskPoints += 12;
    flaggedParameters.push({
      parameter: 'GPU Temperature',
      currentValue: `${metrics.gpuTemp.toFixed(1)}°C`,
      threshold: '< 72.0°C',
      severity: 'warning',
      message: 'GPU temperature is moderately high.',
    });
  }

  // 3. SSD Temperature Evaluation (NVMe drives throttle above 60°C and degrade above 70°C)
  if (metrics.ssdTemp >= 65) {
    riskPoints += 20;
    flaggedParameters.push({
      parameter: 'SSD Temperature',
      currentValue: `${metrics.ssdTemp.toFixed(1)}°C`,
      threshold: '< 55.0°C',
      severity: 'critical',
      message: 'SSD is dangerously hot. Sustained operation at this temperature degrades NAND flash and risks data corruption.',
    });
    recommendations.push('Ensure internal airflow reaches the storage bay; install an NVMe thermal pad.');
  } else if (metrics.ssdTemp >= 52) {
    riskPoints += 8;
    flaggedParameters.push({
      parameter: 'SSD Temperature',
      currentValue: `${metrics.ssdTemp.toFixed(1)}°C`,
      threshold: '< 50.0°C',
      severity: 'warning',
      message: 'SSD storage drive temperature is above typical idle levels.',
    });
  }

  // 4. Fan Speed vs Temperature Correlation (Crucial hardware diagnostic)
  // If CPU is hot (> 75°C) but fan is stopped or very low (< 1000 RPM) -> critical failure!
  if (metrics.cpuTemp > 75 && metrics.fanSpeed < 800) {
    riskPoints += 40;
    flaggedParameters.push({
      parameter: 'Cooling Fan Speed',
      currentValue: `${metrics.fanSpeed} RPM`,
      threshold: '> 2500 RPM under load',
      severity: 'critical',
      message: 'Inadequate fan response: high temperatures detected but cooling fan is unresponsive or stopped.',
    });
    recommendations.push('CRITICAL: Check cooling fan motor for physical dust jam or bearing failure.');
  } else if (metrics.fanSpeed === 0 && (metrics.cpuTemp > 60 || metrics.cpuUsage > 50)) {
    riskPoints += 30;
    flaggedParameters.push({
      parameter: 'Cooling Fan Speed',
      currentValue: '0 RPM',
      threshold: '> 1500 RPM',
      severity: 'critical',
      message: 'Cooling fan is completely stopped while system has active load.',
    });
    recommendations.push('Service the cooling fan module immediately before running demanding applications.');
  }

  // 5. RAM Usage Evaluation
  if (metrics.ramUsage >= 92) {
    riskPoints += 15;
    flaggedParameters.push({
      parameter: 'RAM Usage',
      currentValue: `${metrics.ramUsage.toFixed(1)}%`,
      threshold: '< 85.0%',
      severity: 'warning',
      message: 'Extreme memory saturation. High probability of swap-file thrashing and system unresponsiveness.',
    });
    recommendations.push('Close background tasks or upgrade system memory to prevent excessive paging.');
  } else if (metrics.ramUsage >= 85) {
    riskPoints += 8;
    flaggedParameters.push({
      parameter: 'RAM Usage',
      currentValue: `${metrics.ramUsage.toFixed(1)}%`,
      threshold: '< 80.0%',
      severity: 'warning',
      message: 'Elevated memory consumption detected.',
    });
  }

  // 6. CPU & GPU Continuous High Load
  if (metrics.cpuUsage >= 95 && metrics.gpuUsage >= 90) {
    riskPoints += 15;
    flaggedParameters.push({
      parameter: 'Combined Processing Load',
      currentValue: `CPU: ${metrics.cpuUsage.toFixed(1)}%, GPU: ${metrics.gpuUsage.toFixed(1)}%`,
      threshold: '< 90% sustained',
      severity: 'warning',
      message: 'Simultaneous maximum utilization across CPU and GPU causing full system thermal stress.',
    });
  }

  // 7. Battery Condition
  if (metrics.batteryLevel <= 10 && metrics.cpuUsage > 60) {
    riskPoints += 12;
    flaggedParameters.push({
      parameter: 'Battery Level',
      currentValue: `${metrics.batteryLevel}%`,
      threshold: '> 20% under heavy load',
      severity: 'warning',
      message: 'Critically low battery capacity during heavy workload risks sudden brownout shutdown.',
    });
    recommendations.push('Connect AC power adapter immediately to prevent sudden system power loss.');
  }

  // Clamp estimated risk score to 5% - 98% range for realistic demonstration
  const rawScore = Math.min(Math.max(riskPoints + 5, 8), 98);

  let status: PredictionResult['status'] = 'Healthy';
  let summary = 'No immediate failure detected. All hardware sensors report nominal values.';
  let explanation =
    'Temperatures, memory utilization, and cooling fan response are balanced within manufacturer-recommended safe operating limits. Thermal dissipation is functioning effectively.';

  if (rawScore >= 55 || flaggedParameters.some((f) => f.severity === 'critical')) {
    status = 'High Risk';
    summary = 'Immediate attention required. High risk of hardware thermal throttling, crash, or component wear.';
    explanation =
      'One or more primary hardware components have exceeded maximum safety thresholds. If left unaddressed under sustained load, hardware thermal cutoff or permanent silicon degradation may occur.';
  } else if (rawScore >= 28 || flaggedParameters.length > 0) {
    status = 'Warning';
    summary = 'Moderate hardware stress detected. System is operational but approaching warning limits.';
    explanation =
      'Certain parameters are elevated above baseline idle conditions. While not an immediate failure, proactive cooling or workload reduction is advised to prevent escalation.';
  }

  if (recommendations.length === 0) {
    recommendations.push('Continue normal operation. Periodic dust cleaning every 6 months is recommended.');
    recommendations.push('Keep laptop vents unobstructed on flat, hard surfaces.');
  }

  return {
    status,
    riskScore: rawScore,
    summary,
    explanation,
    flaggedParameters,
    recommendations,
  };
}
