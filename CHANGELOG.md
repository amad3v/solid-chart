# Changelog

All notable changes to this project will be documented in this file.

## [1.0.4] - 2026-01-10

### 🔧 Fixed

- **Initialisation Lifecycle**: Improved the `isConnected` retry logic with a
  "Circuit Breaker" pattern. The library now warns every 2 seconds during
  connection delays and gracefully halts after a maximum retry threshold (`MAX_RETRIES`).

## [1.0.3] - 2026-01-09

### 🔧 Fixed

**Component Integrity**: Fixed a bug where user-provided `type` prop would
override the intended chart type in specific components (e.g., `<Line />`).
Changed JSX prop order to `{...props} type="<chartType>"` to ensure the
hardcoded always "wins".

## [1.0.2] - 2026-01-08

### 🔧 Fixed

Added a silent `isConnected` guard to `init()` to prevent `getComputedStyle`
crashes during async renders (e.g., TanStack Query or Solid Transitions).

## [1.0.1] - 2026-01-08

### 🔧 Fixed

Documentation: Updated `README.md` typo.

## [1.0.0] - 2026-01-08

### 🚀 Added

- **Registration Utilities**: Added `registerLine`, `registerBar`,
  `registerCoreExtra`, etc., to simplify Chart.js setup without bloating the
  bundle.
- **Typed Exports**: Direct exports for `Line`, `Bar`, `Pie`, `Doughnut`,
  `Radar`, `PolarArea`, `Bubble`, and `Scatter` components.
- **ESM-First Build**: Modernized build pipeline using Vite and
  `vite-plugin-dts` for better tree-shaking and IDE support.
- **Store Unwrapping**: Integrated `unwrap` from `solid-js/store` to ensure
  Chart.js doesn't crash when receiving reactive Solid Stores or Proxies.
- **Ref Merging**: Integrated `@solid-primitives/refs` to allow users to pass
  their own refs to the chart components safely.

### 🔧 Fixed

- **Race Conditions**: Switched to a synchronous `onMount` initialisation
  pattern to ensure the `<canvas>` element is always available before Chart.js
  attempts to render.
- **Reactivity Cleanup**: Improved `onCleanup` logic to properly destroy chart
  instances and clear refs, preventing memory leaks in Single Page Applications.
- **TypeScript Support**: Full rewrite of type definitions to support TypeScript
  5.9+ and provide better IntelliSense for Chart.js options.

### 📦 Changed (Migration from `solid-chartjs`)

- **PeerDependencies**: Updated `chart.js` requirement to `^4.5.1` and
  `solid-js` to `^1.9.10`.
- **Package Structure**: Moved to a modern `exports` map in `package.json` with
  support for the `solid` entry point (source-code distribution).
- **Registration Strategy**: Removed automatic global registration in favor of
  the new explicit `register*` utilities to allow for maximum tree-shaking.

---

*Note: This project is a modernised port of [s0ftik3/solid-chartjs](https://github.com/s0ftik3/solid-chartjs).*
