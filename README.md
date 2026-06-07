# Polestar 2 Specification Comparison & Buying Guide Wiki

An independent, interactive community resource for comparing Polestar 2 model specifications, known issues, custom 3D printed accessories, service schedules, and charging performance curves across model years (MY21–MY26).

## Project Structure

```
├── app/                           # Vite React + TypeScript web application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── contexts/              # Theme, Locale, and Market context providers
│   │   ├── data/                  # Specifications and market translations
│   │   ├── pages/                 # Sub-page views (Specs, Known Issues, Charging, etc.)
│   │   └── types/                 # TypeScript type declarations
│   ├── tailwind.config.js         # Styling configurations
│   └── vite.config.ts             # Vite bundler configuration
├── tech-spec.md                   # Technical specification documentation
└── README.md                      # Project setup and overview
```

## Features

1. **Interactive Spec Table**: Side-by-side comparison of model years (MY21 to MY26) with sticky headers, mobile-optimized scrolling, and interactive hover highlight overlays.
2. **Evolution Milestones**: Horizontal timeline showing key updates per model year with animated details panels.
3. **Compare Mode**: Toggle column visibility to focus on comparing specific years.
4. **Column Pinning**: Tap column headers to permanently highlight specific model years.
5. **Live Search**: Instantly filters specifications, features, and notes as you type.
6. **Charging & Thermal Performance**: Detailed DC charging curve chart, AC specs, and thermal preconditioning guidance.
7. **Known Issues & DIY**: Troubleshooting guides, common electrical/mechanical issues, and emergency manual cable release instructions.
8. **3D Printing & Custom Fabrication**: Community CAD links and material guidelines (PC, ASA, TPU) tailored for high-temperature automotive environments.
9. **Swedish & English Localization**: Context-aware Swedish and English translations including paint equivalent matching.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Navigate to the `app` directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## License

This project is licensed under the MIT License.
