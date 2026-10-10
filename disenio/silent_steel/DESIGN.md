---
name: Silent Steel
colors:
  surface: '#0f141b'
  surface-dim: '#0f141b'
  surface-bright: '#343941'
  surface-container-lowest: '#090f15'
  surface-container-low: '#171c23'
  surface-container: '#1b2027'
  surface-container-high: '#252a32'
  surface-container-highest: '#30353d'
  on-surface: '#dee2ec'
  on-surface-variant: '#c0c7d4'
  inverse-surface: '#dee2ec'
  inverse-on-surface: '#2c3138'
  outline: '#8b919d'
  outline-variant: '#414752'
  surface-tint: '#a2c9ff'
  primary: '#a2c9ff'
  on-primary: '#00315c'
  primary-container: '#58a6ff'
  on-primary-container: '#003a6b'
  inverse-primary: '#0060aa'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#67df70'
  on-tertiary: '#00390d'
  tertiary-container: '#40ba51'
  on-tertiary-container: '#004411'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#a2c9ff'
  on-primary-fixed: '#001c38'
  on-primary-fixed-variant: '#004882'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#83fc89'
  tertiary-fixed-dim: '#67df70'
  on-tertiary-fixed: '#002105'
  on-tertiary-fixed-variant: '#005317'
  background: '#0f141b'
  on-background: '#dee2ec'
  surface-variant: '#30353d'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '500'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: '0'
  body-sm:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
    letterSpacing: '0'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: -0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.02em
  caption:
    fontFamily: Geist
    fontSize: 0.6875rem
    fontWeight: '400'
    lineHeight: 0.875rem
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style
The design system establishes a focused, high-precision desktop and utility experience for power users on Linux platforms. It rejects stereotypical "gamer" cliches—dispensing entirely with saturated neon glows, chromatic aberration, aggressive angled polygons, and simulated LEDs. Instead, it positions gaming configuration and runtime management alongside developer-grade productivity tools.

The visual direction draws from high-craft developer interfaces (Linear, Raycast, GitHub, Vercel):
- **Quiet Engineering**: Surfaces are dark, matte, and neutral. Visual tension is kept minimal so performance metrics, logs, and library states take priority.
- **Micro-Precision**: Hierarchy relies on refined typographic scale, disciplined 1px internal boundaries, and subtle luminance shifts rather than heavy fills.
- **Calm Mastery**: The tone is dependable, non-intrusive, and deliberate. Interactions feel instant, smooth, and tactile without theatrical flourishes.

## Colors

The palette operates in strict matte values to ensure visual fatigue remains minimal during prolonged sessions:

### Primary & Accent
- **Primary (`#58a6ff`)**: A measured, desaturated ice blue. Used sparingly for active states, key focus rings, primary actions, and confirmed toggles.
- **Secondary (`#6366f1`)**: Slate-indigo for secondary systems, contextual tools, or supplementary telemetry markers.
- **Tertiary / Success (`#3fb950`)**: Soft muted sage green for nominal runtime states, healthy processes, and synchronized assets. Never neon.

### Additional Functional Accents
- **Warning (`#d29922`)**: Warm sand amber for compatibility notices, non-critical driver notices, or fallback mode alerts.
- **Danger / Destructive (`#f85149`)**: Soft muted crimson for crashes, invalid prefixes, process termination, or critical failures.

### Neutral Layer Architecture
- **Canvas Base (`#0d1117`)**: Deepest background tone for application canvas, outer gutters, and main application frames.
- **Surface Elevation 1 (`#161b22`)**: Primary card panels, sidebar background, and top navigation containers.
- **Surface Elevation 2 (`#21262d`)**: Interactive control backgrounds, nested card blocks, table row hover fills, and modal dialogs.
- **Structural Borders (`#30363d`)**: The standard 1px delimiter for separating components, inputs, and container partitions.
- **Muted Contrast (`#8b949e`)**: Secondary labels, hotkey indicators, system path strings, and disabled states.
- **High Contrast (`#f0f6fc`)**: Primary text, titles, values, and essential status headers.

## Typography

The type system blends the geometric clarity of Geist with the monospace precision of JetBrains Mono for system metrics:

- **Primary Interface (Geist)**: Manages all standard user-facing typography. Headings stay at tight tracking (`-0.025em` to `-0.01em`) with medium to semi-bold weights, retaining an intentional, contemporary software feel.
- **Telemetry & Technical Meta (JetBrains Mono)**: Handles process IDs, kernel arguments, frame rates, Proton compatibility layers, memory allocations, and hotkey shortcuts. Monospaced tabular alignment ensures data blocks and lists do not jump during real-time updates.
- **Vertical Rhythm**: Built strictly on 4px and 8px baseline intervals. Headings maintain compact line heights to keep vertical footprints minimal in information-dense views.

## Layout & Spacing

The interface uses a structured 12-column fluid grid system paired with strict layout zones designed for desktop and handheld Linux environments:

- **Desktop & Workstation (≥1024px)**: Outer margins set to `margin-lg` (2rem) with fixed lateral sidebars (240px to 280px) and a dynamic 12-column workspace using `gutter-lg` (1.5rem). High-density metric panels can adopt internal 6- or 4-column subgrids.
- **Compact Desktop & Handhelds / Steam Deck (768px – 1023px)**: Sidebars collapse to icon-width rails or slide-over drawer drawers. Margins scale to `margin-md` (1.5rem), and gutters reduce to `gutter` (1rem). Grid collapses to 8 columns.
- **Small Screens / Mobile (<768px)**: 4 columns with `margin` (1rem) and `gutter` (1rem). Telemetry rows switch from multi-column tabular spreads to stacked vertical cards.

Component spacing relies strictly on modular increments:
- `space-xs` (4px) and `space-sm` (8px) for badge internals, input padding, and paired icon-label groupings.
- `space-md` (12px) and `space-lg` (16px) for card body padding, stack gaps, and list row separation.
- `space-xl` (24px) and `space-2xl` (32px) strictly for cross-section breathing room.

## Elevation & Depth

Visual hierarchy is communicated via tonal stratification and ultra-fine hairline boundaries rather than drop shadows or luminous halos:

- **Flat Tonal Layering**: Depth is achieved entirely through background value shifting. The primary desktop workspace sits on `#0d1117`, persistent panels and cards on `#161b22`, and active or floating states on `#21262d`.
- **Low-Contrast Outlines (Ghost Borders)**: All containers, modal frames, and inputs feature an unbroken 1px solid border using `#30363d`. Hover and focus interactions do not add thick strokes; they shift the border to `#8b949e` or `#58a6ff` at 1px thickness.
- **Shadow Philosophy**: Drop shadows are eliminated on static elements. Only floating context menus, command palettes, and modals receive elevation: a crisp `0 8px 24px rgba(0, 0, 0, 0.45)` coupled with a continuous 1px `#30363d` outline. No colored or ambient glow effects are permitted.

## Shapes

The design system adopts a Soft (`roundedness: 1`) geometric shape profile:
- Standard elements (buttons, text inputs, badges, select menus) carry a `0.25rem` (4px) corner radius.
- Cards, dialog containers, and internal utility modules employ `rounded-lg` at `0.5rem` (8px).
- Modals, large surface panels, and floating command overlays use `rounded-xl` at `0.75rem` (12px).
- Fully circular radii (`rounded-full`) are reserved exclusively for avatar initials, system indicator dots, and micro toggle handles.

## Components

### Buttons
- **Primary**: Solid background using `#21262d` with a 1px border of `#30363d` and text in `#f0f6fc`. On hover, surface lightens to `#30363d` with an accent outline in `#58a6ff`. Avoid heavy filled primary buttons; prioritize matte understated utility.
- **Secondary / Ghost**: Transparent background with `#f0f6fc` text. Hover applies `#161b22` and a subtle 1px border in `#30363d`.
- **Destructive**: Matte `#21262d` with a `#f85149` (crimson) border at 30% opacity. Text in `#f85149`.

### Chips & Badges
- Built strictly with `label-sm` in JetBrains Mono.
- Backgrounds are low-luminance tinted fills (10% to 15% opacity) over `#161b22`:
  - **Success / Synced**: `#3fb950` tint with `#3fb950` text.
  - **Warning / Non-Native**: `#d29922` tint with `#d29922` text.
  - **Neutral / Meta**: `#30363d` tint with `#8b949e` text.
- Padded with `0.125rem` vertical and `0.375rem` horizontal space, keeping vertical profiles compact.

### Lists & Tables
- Container uses `#161b22` background with `#30363d` outer border.
- Headers styled with `label-sm`, uppercase tracking, and text in `#8b949e`.
- Rows feature subtle dividers (1px solid `#21262d`). Hover state transitions to `#21262d` smoothly (100ms ease-out) across the full row.

### Checkboxes & Radios
- Small, precise `16px × 16px` footprint with a 3px radius for checkboxes and circular for radios.
- Unchecked: `#161b22` background with 1px border in `#30363d`.
- Checked: `#58a6ff` fill with a crisp white or high-contrast dark interior mark. Focus ring is an offset 1px outline in `#58a6ff`.

### Input Fields & Search Bars
- Background set to `#0d1117` with a 1px border in `#30363d` and text in `#f0f6fc`.
- Placeholder text in `#8b949e`. Height locked to 32px or 36px for dense layouts.
- Focus state switches the border to `#58a6ff` with zero outer glow or blur spread. Inline keyboard shortcut indicators (e.g., `⌘K` or `/`) are rendered in JetBrains Mono using a `#21262d` badge.

### Cards & Panels
- Background of `#161b22` with a 1px solid border in `#30363d`.
- Internal padding standard is `space-lg` (16px).
- Interactive card states (e.g., selectable game configurations) elevate to `#21262d` on hover with a border color shift to `#8b949e`.

### Telemetry Displays & Metric Gauges
- Linear horizontal bars for CPU/GPU/VRAM status using a `#21262d` track (4px height) with a solid, non-gradient fill in `#58a6ff` or `#3fb950`.
- Values display alongside the gauge using JetBrains Mono in `body-sm`.