# Polestar 2 Spec Comparison — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2 | UI framework |
| react-dom | ^18.2 | React DOM renderer |
| vite | ^5.0 | Build tool |
| @vitejs/plugin-react | ^4.2 | Vite React plugin |
| tailwindcss | ^3.4 | Utility CSS |
| postcss | ^8.4 | CSS processing |
| autoprefixer | ^10.4 | CSS vendor prefixes |
| typescript | ^5.3 | Type safety |
| @types/react | ^18.2 | React type definitions |
| @types/react-dom | ^18.2 | ReactDOM type definitions |
| gsap | ^3.12 | Animation engine (ScrollTrigger) |
| @gsap/react | ^2.1 | GSAP React integration |
| lucide-react | ^0.400 | Icons (ChevronDown) |

GSAP is the only animation library — no Lenis (not needed, native smooth scroll is sufficient for a single-page spec table).

## Component Inventory

### shadcn/ui
No shadcn/ui components needed — this is a fully custom layout with a bespoke data table. All UI is built with Tailwind.

### Custom Components

| Component | File | Props | Description |
|-----------|------|-------|-------------|
| Hero | `src/sections/Hero.tsx` | none | Title, subtitle, legend bar |
| LegendBar | `src/components/LegendBar.tsx` | none | Sticky legend with symbols |
| FilterPills | `src/components/FilterPills.tsx` | `activeFilter`, `onFilterChange` | Category filter controls |
| SpecTable | `src/sections/SpecTable.tsx` | `data`, `activeFilter` | Main specification table |
| CategorySection | `src/components/CategorySection.tsx` | `category`, `isExpanded`, `onToggle`, `isVisible` | Collapsible category group |
| SpecRow | `src/components/SpecRow.tsx` | `feature`, `index` | Individual feature row |
| TableHeader | `src/components/TableHeader.tsx` | none | Sticky model year header |
| Footer | `src/sections/Footer.tsx` | none | Version info and credits |
| SymbolCell | `src/components/SymbolCell.tsx` | `value` | Renders ●, ○, — or text badge |

### Hooks

| Hook | File | Purpose |
|------|------|---------|
| useScrollReveal | `src/hooks/useScrollReveal.ts` | GSAP ScrollTrigger batch animation for table rows |

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero title/legend fade-in | GSAP | Timeline with staggered opacity+translateY on mount | Low |
| Table row scroll reveal | GSAP ScrollTrigger | `ScrollTrigger.batch()` on `.spec-row` elements, staggered fade+slide | Medium |
| Category header slide-in | GSAP ScrollTrigger | Individual ScrollTrigger per category header, x:-15→0 | Low |
| Category expand/collapse | GSAP | `gsap.to()` on row container height, chevron rotation via CSS transform | Low |
| Filter transition | GSAP | Exit: opacity+height collapse, Enter: opacity fade with delay | Low |
| Column highlight on hover | CSS | `:hover` on th triggers adjacent sibling selector or React state | Low |
| Row hover | CSS | `transition-colors duration-200` | Low |
| Filter pill active state | CSS | `transition-all duration-150` | Low |

## State & Logic

### Data Architecture

The specification data is stored as a typed array of categories, each containing an array of features:

```typescript
interface Feature {
  name: string;
  values: [string, string, string, string, string, string]; // MY21, MY22a, MY22b, MY23, MY24, MY25
  notes?: string;
}

interface Category {
  id: string;
  title: string;
  features: Feature[];
}
```

### State Management

Local React state only — no external store needed:

- `activeFilter: string` — currently selected category filter ("all" default)
- `expandedCategories: Set<string>` — which categories are expanded (all by default)
- `hoveredColumn: number | null` — for column highlight effect

### Key Logic

1. **Filtering**: Filter pills set `activeFilter`. SpecTable filters `categories` array. Non-matching categories are hidden with GSAP exit animation.

2. **Expand/Collapse**: CategorySection toggles its ID in `expandedCategories`. Uses GSAP to animate height from 0 to auto (measured via scrollHeight).

3. **ScrollReveal hook**: On mount, creates ScrollTrigger.batch for all `.spec-row` elements. On filter change, must refresh ScrollTrigger after DOM update.

4. **Sticky stacking**: LegendBar (z-50) → TableHeader (z-40). LegendBar gets bottom border when scrolled via ScrollTrigger `onUpdate` checking scroll position.

## Other Key Decisions

- **No shadcn/ui**: This is a custom data-heavy layout. Adding shadcn would introduce unnecessary abstraction.
- **Native smooth scroll**: `html { scroll-behavior: smooth }` — sufficient for this single-page table. No Lenis needed.
- **CSS transitions for hover states**: All hover effects use Tailwind `transition-*` utilities — no GSAP needed for micro-interactions.
- **Horizontal scroll on mobile**: Table wrapper uses `overflow-x-auto`. First column (feature name) is `position: sticky; left: 0` on mobile only.
- **Static data**: All spec data is hardcoded in a TypeScript file — no API calls needed.
