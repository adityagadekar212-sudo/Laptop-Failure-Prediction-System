/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Terminal, Cpu, CheckCircle2, ShieldAlert, Code2, Server } from 'lucide-react';

interface ProjectGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectGuideModal: React.FC<ProjectGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'run' | 'architecture' | 'viva'>('run');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              LAPTOPGUARD AI — Presentation & Setup Guide
            </h2>
            <p className="text-xs text-slate-500">
              College Project Documentation, Local Run Commands & Architecture
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab buttons */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-2">
          <button
            onClick={() => setActiveTab('run')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'run'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Local Setup (VS Code)</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>System Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab('viva')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'viva'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Viva / College Presentation</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          {activeTab === 'run' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  How to Run this Project Locally in VS Code
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Follow these standard Node.js steps to run the complete React + Vite application on your own machine.
                </p>
              </div>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-3">
                <div>
                  <p className="text-slate-400"># 1. Open the project folder in VS Code or Terminal</p>
                  <p className="text-blue-400">cd laptopguard-ai</p>
                </div>
                <div>
                  <p className="text-slate-400"># 2. Install all required dependencies</p>
                  <p className="text-emerald-400">npm install</p>
                </div>
                <div>
                  <p className="text-slate-400"># 3. Start the local development server</p>
                  <p className="text-emerald-400">npm run dev</p>
                </div>
                <div>
                  <p className="text-slate-400"># 4. Open the displayed local URL in your web browser</p>
                  <p className="text-amber-400">http://localhost:3000</p>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-200/70 p-4">
                <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Prerequisites
                </h4>
                <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                  <li>Node.js (v18 or v20+ recommended)</li>
                  <li>npm (comes with Node.js)</li>
                  <li>Any modern web browser (Chrome, Edge, Firefox, Safari)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">End-to-End System Architecture</h3>
                <p className="text-xs text-slate-500">
                  How LAPTOPGUARD AI connects the frontend dashboard to operating system hardware sensors and machine learning models.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-1">
                    Layer 1: Frontend
                  </p>
                  <p className="text-xs font-bold text-slate-900 mb-1">React + Vite UI</p>
                  <p className="text-xs text-slate-600 leading-normal">
                    3-page monitoring dashboard, real-time trend charts, interactive parameter validation, and risk reporting.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <p className="text-[11px] font-semibold text-purple-600 uppercase tracking-wider mb-1">
                    Layer 2: Backend API
                  </p>
                  <p className="text-xs font-bold text-slate-900 mb-1">Python FastAPI / Flask</p>
                  <p className="text-xs text-slate-600 leading-normal">
                    Runs on host OS. Uses <code className="font-mono text-[11px]">psutil</code>, <code className="font-mono text-[11px]">WMI</code>, or <code className="font-mono text-[11px]">LibreHardwareMonitor</code> to sample real sensor telemetry.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                    Layer 3: ML Model
                  </p>
                  <p className="text-xs font-bold text-slate-900 mb-1">Scikit-Learn Classifier</p>
                  <p className="text-xs text-slate-600 leading-normal">
                    Random Forest / XGBoost trained on laptop telemetry (temperature curves, fan RPM vs thermal dissipation) to output failure likelihood.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
                <p className="text-slate-400"># Sample Python Backend Integration (FastAPI)</p>
                <p className="text-purple-300">@app.post("/api/predict")</p>
                <p className="text-slate-300">def predict_health(metrics: HardwareMetrics):</p>
                <p className="text-slate-300 pl-4"># Load trained model: model.joblib</p>
                <p className="text-slate-300 pl-4">risk_prob = model.predict_proba([[metrics.cpu_temp, ...]])[0][1]</p>
                <p className="text-slate-300 pl-4">return {"{"} "riskScore": risk_prob * 100, "status": ... {"}"}</p>
              </div>
            </div>
          )}

          {activeTab === 'viva' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">College Viva & Evaluation Questions</h3>
                <p className="text-xs text-slate-500">
                  Key talking points when demonstrating this project to professors and evaluators:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-slate-200">
                  <p className="text-xs font-bold text-slate-900 mb-1">
                    Q: Can a web browser directly read CPU/GPU fan RPM and temperatures?
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Answer:</strong> No. Due to browser security sandbox constraints (Spectre/Meltdown mitigations and OS isolation), JavaScript running inside a browser does not have low-level ring-0 access to physical MSR registers or Embedded Controller (EC) fan chips. In production, this frontend connects via REST API or WebSocket to a lightweight host daemon written in Python or C++.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200">
                  <p className="text-xs font-bold text-slate-900 mb-1">
                    Q: What are the key features used to predict failure?
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Answer:</strong> 8 core parameters: CPU Temperature, GPU Temperature, SSD Temperature, CPU Usage, GPU Usage, RAM Usage, Fan Speed, and Battery Level. A key predictor is the thermal dissipation correlation — e.g., high temperature paired with low fan RPM indicates cooling failure.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200">
                  <p className="text-xs font-bold text-slate-900 mb-1">
                    Q: How is the failure prediction implemented in this prototype?
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Answer:</strong> The prototype demonstrates a decoupled heuristic evaluation engine in <code className="font-mono text-slate-800">predictFailure.ts</code> that mirrors multi-factor classifier outputs. It is structured with clean input validation and typed interfaces so it can be swapped with a real Scikit-Learn API call without changing any UI code.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mandatory hardware disclaimer banner */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">Project Notice: </span>
              All readings shown are verified demonstration sample values conforming to the college project brief. No misleading live claim is made.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
