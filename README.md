# LAPTOPGUARD AI — Laptop Failure Prediction System

A clean, modern, and professional web application for hardware health monitoring and failure prediction, built for college project presentations and demonstrations.

---

## 🚀 Quick Start Guide (Run Locally in VS Code)

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or 20+ recommended)
- [Visual Studio Code](https://code.visualstudio.com/)

### Step 1: Open the Project
Open your terminal or VS Code terminal in the project directory:
```bash
cd laptopguard-ai
```

### Step 2: Install Dependencies
Run the command below to install all required packages:
```bash
npm install
```

### Step 3: Start the Development Server
Launch the local development server:
```bash
npm run dev
```

### Step 4: Open in Web Browser
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📋 3-Page Structure

### 1. Page 1: Dashboard (`/`)
- **Title**: LAPTOPGUARD AI — Laptop Health Monitoring & Failure Prediction
- **Dynamic Clock**: Live date and time counter.
- **Health Status Card**: Overall System Health (Good/Fair/Critical), Failure Risk (Low/Moderate/Critical), and estimated Demo Risk Score.
- **8 Hardware Metric Cards**:
  - CPU Usage: `34.2%`
  - CPU Temperature: `54.0°C`
  - GPU Usage: `8.0%`
  - GPU Temperature: `47.0°C`
  - RAM Usage: `61.4%`
  - SSD Temperature: `43.0°C`
  - Battery Level: `86%`
  - Fan Speed: `2100 RPM`
- Navigation button: *"View Detailed Monitoring"* leading to Page 2.

### 2. Page 2: Hardware Monitoring
- **Readable System Report**: Formatted terminal ASCII log with dynamic timestamp, copy-to-clipboard, and `.txt` download:
  ```text
  ================================================
  TIME: 2026-10-21T08:15:30

  CPU        : 34.2%
  CPU Temp   : 54.0°C
  GPU        : 8.0%
  GPU Temp   : 47.0°C
  RAM        : 61.4%
  SSD Temp   : 43.0°C
  Battery    : 86%
  Fan RPM    : 2100.0
  ================================================
  ```
- **Live Telemetry Charts**: Real-time line graphs rendered with Recharts for:
  - CPU Usage (%) & RAM Usage (%)
  - CPU, GPU, and SSD Temperatures (°C)
- Navigation button: *"Check Failure Prediction"* leading to Page 3.

### 3. Page 3: Failure Prediction
- **8 Pre-filled Input Features**: CPU Temp, GPU Temp, CPU Usage, GPU Usage, RAM Usage, SSD Temp, Battery Level, and Fan Speed.
- **Quick Test Presets**: Easily simulate "Normal", "Heavy Load", "Thermal Throttling", and "Fan Failure" with 1 click during college viva.
- **Input Validation**: Verifies physical boundaries (e.g. 0-100%, 10-125°C, 0-8000 RPM) with helpful error messages.
- **Decoupled Prediction Logic**: Implemented in `src/utils/predictFailure.ts`. Clearly separated so it can be swapped with a real Python FastAPI/Flask machine learning model.
- **Diagnostic Output**: Risk percentage, status classification (Healthy / Warning / High Risk), flagged parameter breakdown, and preventive recommendations.

---

## 🔬 System Architecture & ML Backend Integration

In a production environment, web browsers cannot directly access low-level CPU registers or embedded fan controller chips due to sandbox security. The architecture connects as follows:

```
[ Frontend: React + Recharts ]
            ↕ REST API (JSON)
[ Backend: Python FastAPI / Flask Daemon ]
            ↕ psutil / WMI / LibreHardwareMonitor
[ Operating System Hardware Sensors ]
            ↕ Input Features
[ ML Model: Scikit-Learn Random Forest / XGBoost ]
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
