/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  ShieldCheck,
  Cpu,
  Thermometer,
  Layers,
  HardDrive,
  Database,
  BatteryCharging,
  Fan,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { HardwareMetrics, PredictionResult } from '../types/index.ts';
import {
  predictLaptopFailure,
  validateHardwareMetrics,
  ValidationIssue,
} from '../utils/predictFailure.ts';
import { DEMO_PRESETS, INITIAL_HARDWARE_METRICS } from '../utils/sampleData.ts';

interface PredictionPageProps {
  initialMetrics: HardwareMetrics;
  onUpdateGlobalMetrics: (metrics: HardwareMetrics) => void;
}

export const PredictionPage: React.FC<PredictionPageProps> = ({
  initialMetrics,
  onUpdateGlobalMetrics,
}) => {
  // Input fields form state pre-filled with the current metrics
  const [formValues, setFormValues] = useState<HardwareMetrics>({ ...initialMetrics });
  const [validationErrors, setValidationErrors] = useState<ValidationIssue[]>([]);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(() =>
    predictLaptopFailure(initialMetrics)
  );
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof HardwareMetrics, val: string) => {
    const num = parseFloat(val);
    setFormValues((prev) => ({
      ...prev,
      [field]: isNaN(num) ? 0 : num,
    }));
  };

  const handleRunPrediction = (overrideValues?: HardwareMetrics) => {
    const valuesToTest = overrideValues || formValues;
    const errors = validateHardwareMetrics(valuesToTest);

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    setIsCalculating(true);

    // Simulate realistic 300ms compute response time
    setTimeout(() => {
      const result = predictLaptopFailure(valuesToTest);
      setPredictionResult(result);
      onUpdateGlobalMetrics(valuesToTest);
      setIsCalculating(false);
    }, 250);
  };

  const handleLoadPreset = (presetData: HardwareMetrics) => {
    setFormValues({ ...presetData });
    handleRunPrediction(presetData);
  };

  const handleResetToBaseline = () => {
    setFormValues({ ...INITIAL_HARDWARE_METRICS });
    handleRunPrediction(INITIAL_HARDWARE_METRICS);
  };

  // Helper for error on field
  const getFieldError = (field: keyof HardwareMetrics) => {
    return validationErrors.find((e) => e.field === field)?.message;
  };

  const statusTheme =
    predictionResult?.status === 'Healthy'
      ? {
          cardBg: 'bg-emerald-50/70 border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          scoreColor: 'text-emerald-700',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600',
          barColor: 'bg-emerald-500',
        }
      : predictionResult?.status === 'Warning'
      ? {
          cardBg: 'bg-amber-50/70 border-amber-200',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          scoreColor: 'text-amber-700',
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
          barColor: 'bg-amber-500',
        }
      : {
          cardBg: 'bg-rose-50/70 border-rose-200',
          badge: 'bg-rose-100 text-rose-800 border-rose-200',
          scoreColor: 'text-rose-700',
          icon: XCircle,
          iconColor: 'text-rose-600',
          barColor: 'bg-rose-600',
        };

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Failure Prediction System
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600 border border-slate-200">
              Page 3
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Rule-based multi-parameter diagnostic model for hardware failure assessment
          </p>
        </div>

        {/* Demo disclaimer badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetToBaseline}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Reset inputs to default sample baseline"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* College Viva Demonstration Preset Strip */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-900">
              Quick Test Scenarios (Presentation Helper)
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Click any scenario to auto-fill inputs & run instant prediction
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DEMO_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleLoadPreset(p.data)}
              className="px-3 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 bg-slate-50/50 transition-all cursor-pointer group"
            >
              <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 truncate">
                {p.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">{p.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Section: Input Features (Left) + Prediction Result (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 8 Input Parameter Fields */}
        <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Hardware Feature Inputs</h3>
              <p className="text-xs text-slate-500">
                Pre-filled with readings from Page 1 & Page 2. Adjust values to test.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">8 Features</span>
          </div>

          {/* Validation Errors Alert */}
          {validationErrors.length > 0 && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-rose-900">
                <XCircle className="w-4 h-4 text-rose-600" />
                Please correct the following input values:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-rose-700 pl-1">
                {validationErrors.map((err, i) => (
                  <li key={i}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. CPU Temperature */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-red-500" />
                  CPU Temperature (°C)
                </span>
                <span className="text-[10px] text-slate-400">10–125°C</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={formValues.cpuTemp}
                onChange={(e) => handleInputChange('cpuTemp', e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                  getFieldError('cpuTemp') ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="54.0"
              />
              {getFieldError('cpuTemp') && (
                <p className="text-[11px] text-rose-600 mt-0.5">{getFieldError('cpuTemp')}</p>
              )}
            </div>

            {/* 2. GPU Temperature */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  GPU Temperature (°C)
                </span>
                <span className="text-[10px] text-slate-400">10–125°C</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={formValues.gpuTemp}
                onChange={(e) => handleInputChange('gpuTemp', e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                  getFieldError('gpuTemp') ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="47.0"
              />
              {getFieldError('gpuTemp') && (
                <p className="text-[11px] text-rose-600 mt-0.5">{getFieldError('gpuTemp')}</p>
              )}
            </div>

            {/* 3. CPU Usage */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  CPU Usage (%)
                </span>
                <span className="text-[10px] text-slate-400">0–100%</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={formValues.cpuUsage}
                onChange={(e) => handleInputChange('cpuUsage', e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                  getFieldError('cpuUsage') ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="34.2"
              />
              {getFieldError('cpuUsage') && (
                <p className="text-[11px] text-rose-600 mt-0.5">{getFieldError('cpuUsage')}</p>
              )}
            </div>

            {/* 4. GPU Usage */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  GPU Usage (%)
                </span>
                <span className="text-[10px] text-slate-400">0–100%</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={formValues.gpuUsage}
                onChange={(e) => handleInputChange('gpuUsage', e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                  getFieldError('gpuUsage') ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="8.0"
              />
              {getFieldError('gpuUsage') && (
                <p className="text-[11px] text-rose-600 mt-0.5">{getFieldError('gpuUsage')}</p>
              )}
            </div>

            {/* 5. RAM Usage */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-purple-600" />
                  RAM Usage (%)
                </span>
                <span className="text-[10px] text-slate-400">0–100%</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={formValues.ramUsage}
                onChange={(e) => handleInputChange('ramUsage', e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                  getFieldError('ramUsage') ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="61.4"
              />
              {getFieldError('ramUsage') && (
                <p className="text-[11px] text-rose-600 mt-0.5">{getFieldError('ramUsage')}</p>
              )}
            </div>

            {/* 6. SSD Temperature */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  SSD Temperature (°C)
                </span>
                <span className="text-[10px] text-slate-400">10–100°C</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={formValues.ssdTemp}
                onChange={(e) => handleInputChange('ssdTemp', e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                  getFieldError('ssdTemp') ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="43.0"
              />
              {getFieldError('ssdTemp') && (
                <p className="text-[11px] text-rose-600 mt-0.5">{getFieldError('ssdTemp')}</p>
              )}
            </div>

            {/* 7. Battery Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-500" />
                  Battery Level (%)
                </span>
                <span className="text-[10px] text-slate-400">0–100%</span>
              </label>
              <input
                type="number"
                step="1"
                value={formValues.batteryLevel}
                onChange={(e) => handleInputChange('batteryLevel', e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                  getFieldError('batteryLevel') ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="86"
              />
              {getFieldError('batteryLevel') && (
                <p className="text-[11px] text-rose-600 mt-0.5">{getFieldError('batteryLevel')}</p>
              )}
            </div>

            {/* 8. Fan Speed */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Fan className="w-3.5 h-3.5 text-cyan-600" />
                  Fan Speed (RPM)
                </span>
                <span className="text-[10px] text-slate-400">0–8000 RPM</span>
              </label>
              <input
                type="number"
                step="50"
                value={formValues.fanSpeed}
                onChange={(e) => handleInputChange('fanSpeed', e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                  getFieldError('fanSpeed') ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="2100"
              />
              {getFieldError('fanSpeed') && (
                <p className="text-[11px] text-rose-600 mt-0.5">{getFieldError('fanSpeed')}</p>
              )}
            </div>
          </div>

          {/* Action CTA: Predict Laptop Health button */}
          <div className="pt-2">
            <button
              onClick={() => handleRunPrediction()}
              disabled={isCalculating}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg shadow-sm transition-all cursor-pointer active:scale-[0.99]"
            >
              {isCalculating ? (
                <span>Evaluating Sensor Heuristics...</span>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Predict Laptop Health</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Validates input ranges & executes multi-factor rule-based prediction function
            </p>
          </div>
        </div>

        {/* Right Column: Prediction Output Result & Diagnostics */}
        <div className="lg:col-span-6 space-y-4">
          {predictionResult ? (
            <div className={`rounded-xl p-5 sm:p-6 border ${statusTheme.cardBg} shadow-xs space-y-5 transition-all`}>
              {/* Header result row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white shadow-2xs shrink-0">
                    <statusTheme.icon className={`w-7 h-7 stroke-[2.2] ${statusTheme.iconColor}`} />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Prediction Output
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      {predictionResult.status}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-medium text-slate-500">Estimated Demo Risk Score</span>
                  <div className="text-2xl font-black font-mono tabular-nums text-slate-900">
                    {predictionResult.riskScore}%
                  </div>
                </div>
              </div>

              {/* Risk bar */}
              <div>
                <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${statusTheme.barColor}`}
                    style={{ width: `${predictionResult.riskScore}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>0% (Nominal)</span>
                  <span>50% (Threshold)</span>
                  <span>100% (Critical)</span>
                </div>
              </div>

              {/* Result Summary & Explanation */}
              <div className="bg-white/80 p-4 rounded-lg border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Diagnostic Assessment:</h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {predictionResult.summary}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {predictionResult.explanation}
                </p>
              </div>

              {/* Highlighted Parameters Requiring Attention */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
                  <span>Sensor Parameters Requiring Attention:</span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {predictionResult.flaggedParameters.length} Flagged
                  </span>
                </h4>

                {predictionResult.flaggedParameters.length === 0 ? (
                  <div className="bg-white/70 p-3 rounded-lg border border-emerald-200/70 text-xs text-emerald-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>All 8 parameters are safely within manufacturer-recommended operational thresholds.</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {predictionResult.flaggedParameters.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-xs bg-white/90 shadow-2xs ${
                          item.severity === 'critical'
                            ? 'border-rose-300 ring-1 ring-rose-100'
                            : 'border-amber-300 ring-1 ring-amber-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900">{item.parameter}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              item.severity === 'critical'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.severity}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-600 font-mono mb-1">
                          <span>Current: <strong className="text-slate-900">{item.currentValue}</strong></span>
                          <span>Threshold: <strong className="text-slate-900">{item.threshold}</strong></span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-snug">{item.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommended Preventive Actions */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1.5">
                  Actionable Recommendations:
                </h4>
                <ul className="text-xs text-slate-700 space-y-1">
                  {predictionResult.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Disclaimer on rule-based nature */}
              <div className="pt-3 border-t border-slate-200/70 text-[11px] text-slate-500 flex items-start gap-1.5 leading-relaxed">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Presentation Note:</strong> This demonstration uses rule-based heuristic logic in <code className="font-mono text-slate-700">predictFailure.ts</code>. The estimated demo risk score demonstrates multi-factor correlation for your college project and can be connected directly to a Python Scikit-Learn or XGBoost REST endpoint.
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 border border-slate-200 text-center text-slate-500">
              <AlertTriangle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No Prediction Run Yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Enter your desired hardware parameters on the left and click "Predict Laptop Health".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
