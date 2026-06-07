# Polestar 2 Buying Guide & Owner Resource

An interactive, community-built reference guide for the Polestar 2 electric vehicle. Covers specifications, known issues, 3D printing, service & maintenance, and charging & thermal management — with market-aware data for UK, Sweden, and US buyers.

**Live site:** [https://polestar-buying-guide.netlify.app](https://polestar-buying-guide.netlify.app) *(update with your actual URL)*

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** for fast builds and HMR
- **Tailwind CSS 3** for styling
- **React Router 7** for client-side routing
- **Recharts** for interactive charging curve charts
- **shadcn/ui** components

---

## Features

### 📊 Specifications Comparison
- Market-aware model year comparison (MY21–MY26) for UK, Sweden, and US
- Category and package filters
- Paint colour matrix with Volvo-equivalent codes

### ⚠️ Known Issues
- 4-category issue table: Software, Drivetrain, HV Electrical, Climate
- Symptoms + DIY remediation columns
- Compiled from owner reports and service bulletins

### 🖨️ 3D Printing & Custom Fabrication
- Material guidelines (ASA/PC/TPU — why PLA/PETG won't survive)
- Reverse engineering tips
- Printable component repository with external links

### 🔧 Service & Maintenance
- Torque specifications
- Fluid capacities
- 12V battery fitment guide
- Market-aware service interval matrix (km vs miles)

### ⚡ Charging & Thermal
- Interactive DC charging curves (3 battery variants)
- AC charging specs
- Thermal preconditioning protocols
- Heat pump vs resistive heating comparison
- **NMC battery health recommendations** — official Polestar guidance on SoC thresholds, charging habits, storage guidelines, and temperature precautions

### 🌍 Market & Language Support
- **Markets:** UK (km, £), Sweden (km, kr), US (miles, $)
- **Languages:** English + Swedish
- **Theme:** Light / Dark mode
- All settings auto-detect from browser with localStorage persistence

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Known Build Notes
- Node.js 18.x triggers a Vite engine warning but builds successfully
- Main JS bundle ~904KB / 265KB gzipped — exceeds 500KB warning threshold but is non-blocking

---

## Project Structure

```
src/
  components/       # Reusable UI components (Header, charts, tables)
  contexts/         # React contexts: Theme, Market, Locale (i18n)
  data/             # Static datasets (specs, paint colours, issues, etc.)
  hooks/            # Custom React hooks
  lib/              # Utility functions
  pages/            # Route-level page components
  types/            # TypeScript type definitions
  App.tsx           # Root router configuration
  index.css         # Global styles + Polestar CSS custom properties
```

---

## Data Sources

- Polestar official owner's manuals and service documentation
- Owner community reports (Polestar Forum, Reddit r/Polestar, Facebook groups)
- EV charging data from independent testing (Bjørn Nyland, Fastned, etc.)
- 3D printing community repositories (Thingiverse, Printables)

---

## License

This is an independent community resource and is **not affiliated with Polestar**.

Polestar and all related marks are trademarks of Polestar.

Data is compiled for educational purposes. Always consult an authorised Polestar service centre for diagnosis and repair.
