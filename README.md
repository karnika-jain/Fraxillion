# Fraxillion (CaseTrail)

An intelligent bank-side fraud intelligence, investigation, and regulatory reporting platform.

Fraxillion streamlines the entire lifecycle of suspicious financial activity investigations for banking fraud teams, AML compliance officers, and financial crime investigators—from real-time alert triage to immutable evidence logging and statutory regulatory reporting.

---

## 📌 Current State of the Project

The application is currently implemented as an interactive frontend prototype built with React 19 and Vite. It provides functional state management, mock datasets, cryptographic verification in the browser, and regulatory deadline calculation.

### Core Modules

1. **Alert Inbox (`/alerts`)**
   - Ingests alerts from various detection channels (transaction monitoring, account takeovers, velocity triggers).
   - Allows investigators to review alert severity, timestamps, account summaries, and triage items into formal investigation cases with deduplication checks.

2. **Case Management (`/cases`)**
   - Central registry for managing open investigations.
   - Tracks case IDs, linked source alerts, target accounts, risk levels, assigned investigators, and investigation status.

3. **Tamper-Evident Evidence Vault (`/evidence`)**
   - Secure logging of investigation evidence (CCTV, IP logs, withdrawal slips, audio files).
   - **Cryptographic Fingerprint Chain:** Computes an audit chain using browser-native SHA-256 (`crypto.subtle.digest`) where each piece of evidence links to the fingerprint of the preceding block.
   - **Interactive Integrity Verification:** Supports validating chain integrity, simulating tampering to demonstrate detection, and resetting to the pristine ledger state.

4. **Regulatory Reporting & STR Assistant (`/reports`)**
   - Registry of submitted and pending compliance reports.
   - **Draft STR (Suspicious Transaction Report) Assistant:** Designed around regulatory frameworks (such as FIU-IND).
   - Automatically populates case details and highlights missing mandatory compliance fields in real-time.
   - **Automated Deadline Calculator:** Computes statutory filing deadlines (calculating 7 working days, automatically excluding weekends) and provides countdown indicators with color-coded urgency states.

5. **Dashboard (`/`)**
   - Summary overview for investigators to monitor pending workloads, active cases, and upcoming regulatory deadlines.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Integrity & Hashing:** Web Crypto API (`SHA-256`)

---

## 📁 Project Structure

```text
Fraxillion/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and SVG icons
│   ├── data/               # Mock datasets
│   │   ├── alerts.js       # Incoming alert records
│   │   ├── cases.js        # Active case data
│   │   ├── evidence.js     # Evidence records for chain verification
│   │   └── reports.js      # Existing regulatory reports
│   ├── AlertInbox.jsx      # Alert triage and case promotion
│   ├── Cases.jsx           # Case management table
│   ├── EvidenceVault.jsx   # Cryptographic evidence chain & tamper simulation
│   ├── Reports.jsx         # STR filing assistant & deadline calculation
│   ├── Layout.jsx          # Sidebar navigation and header
│   ├── App.jsx             # Top-level state and routing
│   ├── main.jsx            # React root entrypoint
│   └── index.css           # Global baseline styles
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended; verified on v24+)
- npm (v9+)

### Installation

1. Clone the repository (if not already cloned):
   ```bash
   git clone https://github.com/karnika-jain/Fraxillion.git
   cd Fraxillion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

---

## 📜 Available Scripts

- `npm run dev` - Launches the Vite dev server with Hot Module Replacement (HMR).
- `npm run build` - Bundles and optimizes the app for production in the `dist` directory.
- `npm run preview` - Locally previews the production build.
- `npm run lint` - Runs ESLint to check code quality.
